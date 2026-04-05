import { client } from "./client";
import type { components } from "./generated";

type ApiPet = components["schemas"]["Pet"];
type PetStatus = ApiPet["status"];

type AddressType = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo?: string;
};

export type Pet = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: AddressType;
  photoUrls: string[];
  status?: PetStatus;
};

export type CreatePetInput = {
  name: string;
  email: string;
  username: string;
  adopted?: boolean;
};

const BASE_URL: NonNullable<PetStatus> = "available";
const PHOTO_URL = "https://placehold.co/600x400?text=Pet";

function getErrorMessage(
  error: unknown,
  response: Response | undefined,
  fallbackMessage: string,
): string {
  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string" && error.message) {
      return error.message;
    }

    if ("error" in error && typeof error.error === "string" && error.error) {
      return error.error;
    }
  }

  if (typeof error === "string" && error) {
    return error;
  }

  if (response) {
    if (response.statusText) {
      return `${response.status} ${response.statusText}`;
    }

    return `Request failed with status ${response.status}`;
  }

  return fallbackMessage;
}

function hasValidPetId(pet: ApiPet): pet is ApiPet & { id: number } {
  return typeof pet.id === "number" && pet.id > 0;
}

function formatStatus(status?: PetStatus): string {
  if (!status) {
    return "Unknown";
  }

  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
}

function toUiPet(pet: ApiPet & { id: number }): Pet {
  return {
    id: pet.id,
    name: pet.name,
    username: pet.tags?.[0]?.name ?? "",
    email: pet.category?.name ?? "",
    address: {
      city: formatStatus(pet.status),
      street: "",
      suite: "",
      zipcode: "",
    },
    photoUrls: pet.photoUrls,
    status: pet.status,
  };
}

function toApiPet(newPet: CreatePetInput): ApiPet {
  return {
    name: newPet.name,
    category: newPet.email ? { name: newPet.email } : undefined,
    photoUrls: [PHOTO_URL],
    tags: newPet.username ? [{ name: newPet.username }] : undefined,
    status: newPet.adopted ? "sold" : BASE_URL,
  };
}

export async function getPets(): Promise<Pet[]> {
  const [availableResponse, soldResponse] = await Promise.all([
    client.GET("/pet/findByStatus", {
      params: {
        query: {
          status: BASE_URL,
        },
      },
    }),
    client.GET("/pet/findByStatus", {
      params: {
        query: {
          status: "sold",
        },
      },
    }),
  ]);

  if (availableResponse.error) {
    throw new Error(
      getErrorMessage(
        availableResponse.error,
        availableResponse.response,
        "Failed to fetch pets",
      ),
    );
  }

  if (soldResponse.error) {
    throw new Error(
      getErrorMessage(
        soldResponse.error,
        soldResponse.response,
        "Failed to fetch pets",
      ),
    );
  }

  return [...(availableResponse.data ?? []), ...(soldResponse.data ?? [])]
    .filter(hasValidPetId)
    .map(toUiPet);
}

export async function createPet(newPet: CreatePetInput): Promise<Pet> {
  const { data, error, response } = await client.POST("/pet", {
    body: toApiPet(newPet),
  });

  if (error || !data) {
    throw new Error(getErrorMessage(error, response, "Failed to add pet"));
  }

  if (!hasValidPetId(data)) {
    throw new Error("Created pet did not include a valid ID");
  }

  return toUiPet(data);
}

export async function deletePet(petId: Pet["id"]): Promise<void> {
  if (petId <= 0) {
    throw new Error("Pet ID is invalid");
  }

  const { error, response } = await client.DELETE("/pet/{petId}", {
    params: {
      path: {
        petId,
      },
    },
  });

  if (error) {
    throw new Error(getErrorMessage(error, response, "Failed to delete pet"));
  }
}
