import "./style.css";
import { theme } from "./theme";
import Swal from "sweetalert2";

let cardDetails = {};

const evervault = new window.Evervault(import.meta.env.VITE_EVERVAULT_TEAM_ID, import.meta.env.VITE_EVERVAULT_APP_ID);

const card = evervault.ui.card({ 
  theme: theme()
});

card.on("ready", () => {
  document.body.classList.add("ready");
});

const cardIcon: HTMLElement = document.querySelector(".card-icon")!;

card.on("change", (values) => {
  if (!cardIcon) return;

  if (values.card.brand) {
    cardIcon.dataset.type = values.card.brand;
    cardIcon.classList.add("show");
    card.update({ theme: theme({ showIcon: true }) });
  } else {
    cardIcon.classList.remove("show");
    card.update({ theme: theme() });
  }
});

card.on("complete", (values) => {
  cardDetails = values.card;
});

card.mount("#card");

const submit = document.getElementById("submit")! as HTMLButtonElement;

const retrieve3DSSession = async (sessionId) => {
  const res = await fetch(`/api/get-session/${sessionId}`);

  return res.json();
};

const handleAlert = async (session) => {
  console.log(session);
  if (session.status === 'success') {
    Swal.fire({
      title: "Booking confirmed!",
      icon: "success",
      color: "#000000",
      confirmButtonColor: "#6633ee"
    });
  }

  if (session.status === 'failure') {
    Swal.fire({
      title: "Error completing 3DS Authentication",
      text: "Failure reason: " + session.failureReason,
      icon: "error",
      color: "#000000",
      confirmButtonColor: "#6633ee"
    });
  }

  if (session.status === 'error') {
    Swal.fire({
      title: "Error completing 3DS Authentication",
      text: "Error reason: " + session.message,
      icon: "error",
      color: "#000000",
      confirmButtonColor: "#6633ee"
    });
  }
};


submit.addEventListener("click", async () => {
  const create3DSSession = await fetch("/api/3ds", {
    method: 'POST',
    body: JSON.stringify(cardDetails),
    headers: {
        'Content-Type': 'application/json'
    }
  });

  const threeDSSession = await create3DSSession.json();
  handleAlert(threeDSSession);

  if (threeDSSession.status === 'action-required') {
    const threeDSecure = evervault.ui.threeDSecure(threeDSSession.id);
    threeDSecure.mount();
    threeDSecure.on("success", async () => {
      handleAlert(await retrieve3DSSession(threeDSSession.id));
    });
    threeDSecure.on("failure", async () => {
      handleAlert(await retrieve3DSSession(threeDSSession.id));
    });
    threeDSecure.on("error", async (error) => {
      handleAlert({ ...await retrieve3DSSession(threeDSSession.id), message: error.message, status: 'error' });
    });
  }
});