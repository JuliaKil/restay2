import Cookies from "js-cookie";

export class EventService {
  static async createHotel(tripId, hotelData) {
    const response = await fetch("/api/hotel/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...hotelData, tripId }),
    });

    return response;
  }

  static async createSight(tripId, sightData) {
    const response = await fetch("/api/sight/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...sightData, tripId }),
    });

    return response;
  }

  static async createTransfer(tripId, transferData) {
    const response = await fetch("/api/transfer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...transferData, tripId }),
    });

    return response;
  }

  static async updateTransfer(tripId, transferId, transferData) {
    const response = await fetch(`/api/transfer/${transferId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...transferData, tripId }),
    });

    return response;
  }

  static async updateHotel(tripId, hotelId, hotelData) {
    const response = await fetch(`/api/hotel/${hotelId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...hotelData, tripId }),
    });

    return response;
  }

  static async updateSight(tripId, sightId, sightData) {
    const response = await fetch(`/api/sight/${sightId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ ...sightData, tripId }),
    });

    return response;
  }

  static async deleteTransfer(transferId) {
    const response = await fetch(`/api/transfer/${transferId}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    return response;
  }

  static async deleteHotel(hotelId) {
    const response = await fetch(`/api/hotel/${hotelId}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    return response;
  }

  static async deleteSight(sightId) {
    const response = await fetch(`/api/sight/${sightId}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    return response;
  }
}
