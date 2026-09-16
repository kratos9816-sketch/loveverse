export const loveverseData = {
  girlfriendName: "Kirthikha",
  partnerNickname: "Your idiot ❤️",
  musicUrl: "/assets/music/loveverse.mp3",

  // Honey Tree Letter (Page 2)
  honeyLetter: {
    title: "THE HONEY I FOUND",
    content: `My Love,

I always thought honey was supposed to be the sweetest thing in this little universe…

until I met you. ❤️

Somehow, you became the sweetness in my ordinary days.

You became the person I look for when something good happens.

The person I want beside me when everything feels difficult.

And somehow, without even realizing it…

you became my home. 🫂❤️`
  },

  // Flower Path Flowers (Page 3)
  flowers: [
    {
      id: "smile",
      title: "YOUR SMILE",
      text: "Your smile has this stupid little superpower…\n\nit can completely change my mood. 🥹❤️"
    },
    {
      id: "presence",
      title: "YOUR PRESENCE",
      text: "You don’t even have to say anything.\n\nSometimes just knowing you’re there is enough."
    },
    {
      id: "us",
      title: "US",
      text: "We’ve had beautiful days.\nWe’ve had confusing days.\nWe’ve had moments where everything felt perfect…\nand moments where we didn’t understand each other.\n\nBut through every up and down,\nI still want to cherish what we have. ❤️"
    }
  ],

  // Night Forest Stars (Page 4)
  stars: [
    { id: 1, wish: "More mornings with you." },
    { id: 2, wish: "More random conversations." },
    { id: 3, wish: "More stupid fights that we eventually laugh about." },
    { id: 4, wish: "More dates." },
    { id: 5, wish: "More memories." }
  ],
  finalStarWish: "More LIFE with you. ❤️",

  // Memory Map Dates (Page 5)
  // Structure allows easily swapping or replacing images and videos
  dates: [
    {
      id: "date1",
      title: "DATE 01",
      subtitle: "Where our little adventure began...",
      dateString: "First Chapter",
      description: "That nervous, butterfly-filled moment when our story officially began. Every smile from that day is locked in my heart.",
      coverImage: "/images/cover-1.jpeg",
      media: [
        { type: "image", src: "/images/cover-1.jpeg", caption: "The beginning of forever ❤️" },
        { type: "image", src: "/images/WhatsApp Image 2026-09-13 at 09.42.02.jpeg", caption: "Your gorgeous smile" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.41.56.mp4", caption: "Sweet laughter caught on camera" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.41.56 (1).mp4", caption: "Our first playful moments" }
      ]
    },
    {
      id: "date2",
      title: "DATE 02",
      subtitle: "Laughter & Sweet Little Moments...",
      dateString: "Second Chapter",
      description: "Finding out how effortless it is to talk with you for hours and lose track of time completely.",
      coverImage: "/images/cover-2.jpeg",
      media: [
        { type: "image", src: "/images/cover-2.jpeg", caption: "Looking at you looking at the world" },
        { type: "image", src: "/images/WhatsApp Image 2026-09-13 at 09.42.02 (1).jpeg", caption: "My favorite picture of us" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.41.57.mp4", caption: "Holding your hand" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.42.02.mp4", caption: "Cute silly smiles" }
      ]
    },
    {
      id: "date3",
      title: "DATE 03",
      subtitle: "Magic in the Everyday...",
      dateString: "Third Chapter",
      description: "Even simple walks feel like scene transitions in a romantic movie when you're beside me.",
      coverImage: "/images/WhatsApp Image 2026-09-13 at 09.42.02.jpeg",
      media: [
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.42.03.mp4", caption: "Sunny day with my favorite girl" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.42.03 (1).mp4", caption: "Pure happiness" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.42.03 (2).mp4", caption: "Making memories together" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.42.04.mp4", caption: "Unforgettable moments" }
      ]
    },
    {
      id: "date4",
      title: "DATE 04",
      subtitle: "Under the Sun & Stars...",
      dateString: "Fourth Chapter",
      description: "Exploring new places together and discovering that anywhere with you is my favorite destination.",
      coverImage: "/images/cover-1.jpeg",
      media: [
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.28.mp4", caption: "Adventures in full color" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.29.mp4", caption: "Warm breeze & happy hearts" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.30.mp4", caption: "Your laughter is my melody" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.30 (1).mp4", caption: "Special evening" }
      ]
    },
    {
      id: "date5",
      title: "DATE 05",
      subtitle: "Our Favorite Secret Place...",
      dateString: "Fifth Chapter",
      description: "Five dates in, and I know without a single shadow of doubt that you're the one I want to share every adventure with.",
      coverImage: "/images/cover-2.jpeg",
      media: [
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.31.mp4", caption: "Cinematic moments with you" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.47.31 (1).mp4", caption: "Deep in love" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 09.53.34.mp4", caption: "My cozy home" },
        { type: "video", src: "/images/WhatsApp Video 2026-09-13 at 10.12.02.mp4", caption: "Chapter 1 highlights" }
      ]
    }
  ],

  // Memory Garden floating photos (Page 6)
  generalMemories: [
    { id: "g1", type: "image", src: "/images/cover-1.jpeg", caption: "Your golden smile ✨", rotation: -4 },
    { id: "g2", type: "image", src: "/images/cover-2.jpeg", caption: "Wrapped in warm sunshine ☀️", rotation: 5 },
    { id: "g3", type: "image", src: "/images/WhatsApp Image 2026-09-13 at 09.42.02.jpeg", caption: "My happiest place in the universe 🫂", rotation: -2 },
    { id: "g4", type: "image", src: "/images/WhatsApp Image 2026-09-13 at 09.42.02 (1).jpeg", caption: "Forever loving you ❤️", rotation: 3 },
    { id: "g5", type: "video", src: "/images/WhatsApp Video 2026-09-13 at 10.12.05.mp4", caption: "Cutest reaction video 🎥", rotation: -5 },
    { id: "g6", type: "video", src: "/images/WhatsApp Video 2026-09-13 at 10.12.06.mp4", caption: "Special memory snippet 🍯", rotation: 4 },
    { id: "g7", type: "video", src: "/images/WhatsApp Video 2026-09-13 at 10.12.06 (1).mp4", caption: "Smiles that light up my dark days ✨", rotation: -3 },
    { id: "g8", type: "video", src: "/images/WhatsApp Video 2026-09-13 at 10.12.06 (2).mp4", caption: "Sweetest laughter 💕", rotation: 2 }
  ],

  // Handwritten Letter (Page 8)
  handwrittenLetter: {
    salutation: "My Love,",
    paragraphs: [
      "I don’t know what our future is going to look like.",
      "I don’t know how many adventures are waiting for us.",
      "I don’t know how many difficult days we’ll have to face.",
      "But I know one thing.",
      "Every beautiful memory I’ve made with you is something I’ll always treasure.",
      "I want to keep laughing with you.",
      "I want to keep annoying you.",
      "I want to keep going on little dates with you.",
      "I want to keep making memories that we’ll look back at years from now and smile about.",
      "And more than anything…",
      "I want you to always know how deeply you are loved. 🫂❤️",
      "You became such a special part of my life.",
      "And no matter how many chapters we write,",
      "I’ll always be grateful that our story started.",
      "Welcome to our Loveverse, my love.",
      "This little universe is ours. 🌎❤️",
      "And this is only Chapter 1…"
    ],
    closing: "Forever yours,",
    signature: "Your idiot ❤️"
  }
};
