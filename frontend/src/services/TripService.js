import Cookies from "js-cookie";

class TripService {
  static async createTrip(tripName) {
    const response = await fetch("/api/trip/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ name: tripName }),
    });

    return response;
  }

  static async updateTrip(tripId, tripName) {
    const response = await fetch(`/api/trip/${tripId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ name: tripName }),
    });

    return response;
  }

  static async deleteTrip(tripId) {
    const response = await fetch(`/api/trip/${tripId}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    return response;
  }

  static async getTrips() {
    const response = await fetch("/api/trip/");

    return response;
  }

  static async getTrip(tripId) {
    const response = await fetch(`/api/trip/${tripId}/`);

    return response;
  }
}

export default TripService;
