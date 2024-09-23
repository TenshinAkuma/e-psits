export function useEvents() {
  const events = reactive({
    E00001: {
      title: "National Hackathon Challenge",
      description:
        "This 24-hour coding competition challenges teams to build innovative software solutions from scratch. Participants will tackle real-world problems and present their work to a panel of judges. The event fosters creativity, teamwork, and technical skills under intense time pressure.",
      category: "Competition",
      duration: "24 hours",
      date: "2024-10-15",
      location: "General Santos City, SM Conve  ntion Center",
      registrationStart: new Date("2024-09-01"), // Registration starts on September 1st, 2024
      registrationEnd: new Date("2024-10-01"), // Registration ends on October 1st, 2024
    },
    E00002: {
      title: "Start-up Pitching Competition",
      description:
        "This event invites students to pitch their start-up ideas to a panel of potential investors. Participants will have the opportunity to showcase their business acumen and innovative thinking. The competition offers valuable feedback and networking opportunities with industry leaders.",
      category: "Competition",
      duration: "1 day",
      date: "2024-11-05",
      location: "General Santos City, KCC Mall Event Hall",
      registrationStart: new Date("2024-09-15"), // Registration starts on September 15th, 2024
      registrationEnd: new Date("2024-10-25"), // Registration ends on October 25th, 2024
    },
    E00003: {
      title: "Capture the Flag (CTF) Competition",
      description:
        "This cybersecurity challenge involves solving a series of security-related puzzles and tasks. Participants will test their hacking skills in a controlled environment to capture digital flags. The competition aims to promote learning and mastery of cybersecurity concepts.",
      category: "Competition",
      duration: "12 hours",
      date: "2024-09-20",
      location: "General Santos City, MSU Gymnasium",
      registrationStart: new Date("2024-08-01"), // Registration starts on August 1st, 2024
      registrationEnd: new Date("2024-09-10"), // Registration ends on September 10th, 2024
    },
    E00004: {
      title: "IT Quiz Bee",
      description:
        "This quiz competition is designed to test participants' knowledge of IT fundamentals and concepts. Teams will compete against each other in a series of rounds, answering questions on various IT topics. The event encourages quick thinking and deep understanding of the subject matter.",
      category: "Competition",
      duration: "3 hours",
      date: "2024-12-10",
      location: "General Santos City, Notre Dame Auditorium",
      registrationStart: new Date("2024-11-01"), // Registration starts on November 1st, 2024
      registrationEnd: new Date("2024-11-30"), // Registration ends on November 30th, 2024
    },
    E00005: {
      title: "Software Development Challenge",
      description:
        "In this two-day competition, teams will develop a complete software application from concept to implementation. Participants will demonstrate their coding, design, and project management skills. The challenge provides a platform to showcase innovative solutions and collaborate with peers.",
      category: "Competition",
      duration: "2 days",
      date: "2024-12-20",
      location: "General Santos City, UM Event Center",
      registrationStart: new Date("2024-11-10"), // Registration starts on November 10th, 2024
      registrationEnd: new Date("2024-12-05"), // Registration ends on December 5th, 2024
    },
  });

  return {
    events,
  };
}
