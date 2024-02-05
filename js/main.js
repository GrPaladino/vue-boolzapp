const { createApp } = Vue;

const dt = luxon.DateTime;

const app = createApp({
  data() {
    return {
      currentContact: 0,
      searchContact: "",
      classNone: "",

      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },

        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },

            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },

            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },

        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },

            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },

            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },

        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,

          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },

        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,

          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },

        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,

          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },

            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },

        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,

          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },

        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,

          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },

            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },

            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      replyMessages: [
        "Ciao",
        "Arrivo",
        "A che ora torni stasera",
        "Sono in macchina ti chiamo dopo",
        "Sarò li tra 20 minuti",
        "Passo a comprar le banane",
      ],

      newMsg: {
        date: "",
        message: "",
        status: "sent",
      },

      newOk: {
        date: "",
        message: "",
        status: "received",
      },
    };
  },

  computed: {
    activeContact() {
      return this.contacts[this.currentContact];
    },
  },

  methods: {
    goToContact(i) {
      this.currentContact = i;
    },

    getLastMessage(messages) {
      const lastMessage = messages.at(-1);
      return lastMessage ? lastMessage.message : "";
    },

    getLastAccess(messages) {
      const sentMessages = messages.filter(
        (message) => message.status == "received"
      );
      const lastMessage = sentMessages.at(-1);

      return lastMessage ? this.getFormattedDate(lastMessage.date) : "";
    },

    sendNewMessage() {
      if (this.newMsg.message.length < 1) {
        return;
      } else {
        this.newMsg.date = this.getRealTime();
        this.activeContact.messages.push({
          ...this.newMsg,
        });
        this.newMsg.message = "";
        this.sendOkMsg();
      }
    },

    sendOkMsg() {
      setTimeout(() => {
        this.newOk.date = this.getRealTime();
        this.newOk.message = this.getRandomReply();

        this.activeContact.messages.push({
          ...this.newOk,
        });
      }, 1000);
    },

    getRealTime() {
      const now = new Date();

      const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      const month =
        now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1;
      const year =
        now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();
      const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
      const minutes =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      const seconds =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

      const realTime = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
      return realTime;
    },

    getFormattedDate(date) {
      const messageDate = dt.fromFormat(date, "dd/MM/yyyy HH:mm:ss");
      const messageDateString = messageDate.toLocaleString(dt.TIME_SIMPLE);

      return messageDateString;
    },

    isVisible(contact) {
      return contact.name
        .toLowerCase()
        .includes(this.searchContact.toLowerCase());
    },

    removeMessage(i) {
      this.activeContact.messages.splice(i, 1);
    },

    getRandomNumber(min, max) {
      min = parseInt(min);
      max = parseInt(max);

      if (isNaN(min) || isNaN(max)) {
        console.error("I valori inseriti devono essere numerici");
        return;
      }

      if (min >= max) {
        console.error(
          "Il valore massimo deve essere maggiore del valore minimo"
        );
        return;
      }
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      return randomNumber;
    },

    getRandomReply() {
      const reply =
        this.replyMessages[
          this.getRandomNumber(0, this.replyMessages.length - 1)
        ];

      return reply;
    },

    removePopup() {
      this.classNone = "d-none";
    },
  },

  created() {},
});
app.mount("#root");
