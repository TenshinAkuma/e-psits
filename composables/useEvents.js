export function useEvents() {
  const events = reactive({
    "E00001": {
      title: "National Hackathon Challenge",
      description: "This 24-hour coding competition challenges teams to build innovative software solutions from scratch. Participants will tackle real-world problems and present their work to a panel of judges. The event fosters creativity, teamwork, and technical skills under intense time pressure.",
      category: "Hackathon",
      duration: "24 hours",
      date: "2024-10-15",
      location: "General Santos City, SM Convention Center",
      eligibility: "Open to all IT students nationwide.",
      requiredParticipants: "3-5 per team",
      registrationDeadline: "2024-10-01"
    },
    "E00002": {
      title: "Start-up Pitching Competition",
      description: "This event invites students to pitch their start-up ideas to a panel of potential investors. Participants will have the opportunity to showcase their business acumen and innovative thinking. The competition offers valuable feedback and networking opportunities with industry leaders.",
      category: "Pitching",
      duration: "1 day",
      date: "2024-11-05",
      location: "General Santos City, KCC Mall Event Hall",
      eligibility: "IT students with a start-up idea.",
      requiredParticipants: "1-3 per team",
      registrationDeadline: "2024-10-20"
    },
    "E00003": {
      title: "Capture the Flag (CTF) Competition",
      description: "This cybersecurity challenge involves solving a series of security-related puzzles and tasks. Participants will test their hacking skills in a controlled environment to capture digital flags. The competition aims to promote learning and mastery of cybersecurity concepts.",
      category: "Cybersecurity",
      duration: "12 hours",
      date: "2024-09-20",
      location: "General Santos City, MSU Gymnasium",
      eligibility: "Students with knowledge in cybersecurity.",
      requiredParticipants: "1-4 per team",
      registrationDeadline: "2024-09-05"
    },
    "E00004": {
      title: "IT Quiz Bee",
      description: "This quiz competition is designed to test participants' knowledge of IT fundamentals and concepts. Teams will compete against each other in a series of rounds, answering questions on various IT topics. The event encourages quick thinking and deep understanding of the subject matter.",
      category: "Quiz",
      duration: "3 hours",
      date: "2024-12-10",
      location: "General Santos City, Notre Dame Auditorium",
      eligibility: "First and second-year IT students.",
      requiredParticipants: "3 per team",
      registrationDeadline: "2024-11-25"
    },
    "E00005": {
      title: "Software Development Challenge",
      description: "In this two-day competition, teams will develop a complete software application from concept to implementation. Participants will demonstrate their coding, design, and project management skills. The challenge provides a platform to showcase innovative solutions and collaborate with peers.",
      category: "Development",
      duration: "2 days",
      date: "2024-12-20",
      location: "General Santos City, UM Event Center",
      eligibility: "Open to all IT students.",
      requiredParticipants: "4-6 per team",
      registrationDeadline: "2024-12-05"
    }
  });

  return {
    events
  };
}
