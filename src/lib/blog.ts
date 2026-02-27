export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-started-yoga",
    title: "Why I Started Yoga",
    date: "February 10, 2026",
    category: "Inspiration",
    excerpt:
      "My journey into yoga began on a stage — ballet gave me discipline, but yoga gave me breath. Here's the story of how I found balance.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    content: [
      "I spent the better part of my early life in pointe shoes. Ballet was everything — the discipline, the artistry, the relentless pursuit of perfection. But somewhere along the way, I lost my breath. Not literally, but in all the ways that matter.",
      "I found yoga almost by accident during a summer intensive in New York. A friend dragged me to a rooftop class in Brooklyn, and I spent the first twenty minutes silently critiquing the instructor's alignment cues. (Old habits die hard.)",
      "Then we hit savasana. The city noise faded. I stopped making lists in my head. For a few minutes, I was simply here.",
      "That was it. That was the thing I didn't know I needed — not another routine to perfect, but a practice to come home to. From that rooftop in Brooklyn to a solarium on a lake in Ithaca, yoga has been the thread running through every chapter since.",
      "If you're reading this and you've been putting off starting — don't wait for the right mat, the right studio, or the right level of flexibility. Come as you are. The practice meets you there.",
    ],
  },
  {
    slug: "five-morning-poses",
    title: "5 Poses to Start Your Morning",
    date: "January 28, 2026",
    category: "Practice",
    excerpt:
      "You don't need an hour — just five intentional poses to shift your energy, wake your body, and set the tone for your day.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    content: [
      "My mornings on the lake have a rhythm to them. Before coffee, before my phone, I roll out my mat and move through a short sequence that never fails to change how I show up for the day. Here are the five poses I keep coming back to.",
      "**Child's Pose (Balasana)** — Start here. Let gravity do the work. Three to five deep breaths, letting the back body expand on every inhale. This is your reset, your permission slip to slow down before you speed up.",
      "**Cat-Cow (Chakravakasana)** — Warm up the spine one vertebra at a time. I like to close my eyes and tune into where I'm holding tension. Usually it's the same spot — right between the shoulder blades. Yours might surprise you.",
      "**Low Lunge (Anjaneyasana)** — Open the hip flexors. If you sit at a desk or slept in a tucked position, this one is non-negotiable. Stay five breaths per side and feel the difference.",
      "**Standing Forward Fold (Uttanasana)** — Soft knees, heavy head. Let the neck release completely. This gentle inversion wakes up circulation and signals to the nervous system that you're ready to move.",
      "**Mountain Pose (Tadasana)** — End here. Feet rooted, crown lifted, eyes soft. Take one full breath in and one full breath out. Notice you're standing taller than when you started. That's the practice working.",
      "The whole sequence takes about ten minutes. Some mornings I linger longer; some mornings this is all I get. Either way, it counts.",
    ],
  },
  {
    slug: "yoga-while-traveling",
    title: "Yoga While Traveling",
    date: "January 5, 2026",
    category: "Wellness",
    excerpt:
      "A hotel room, a beach, a mountain trail — your practice goes where you go. Here's how I keep it consistent on the road.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    content: [
      "Most of my YouTube videos exist because of travel. I started filming classes in hostel common rooms, on jungle trails, on the rooftop of a guesthouse in Chiang Mai — partly to share, but mostly to stay accountable.",
      "Traveling disrupts everything: sleep schedules, eating habits, exercise routines. But it also offers something a home practice can't — novelty. New surroundings make you more present. You notice things you take for granted on your familiar mat at home.",
      "Here are my ground rules for a travel yoga practice:",
      "**Pack light but always pack a mat.** I use a foldable travel mat that fits in a carry-on. It's not as cushy as my studio mat, but it's mine, and it signals to my body that it's time to practice.",
      "**Lower the bar.** At home I might want a 60-minute flow. On travel days, 15 minutes of stretching in the airport counts. Perfection is the enemy of consistency.",
      "**Use your surroundings.** A wall is a prop. Stairs are a prop. A bench is a prop. Some of my favorite practices have happened in the most unlikely places because I had to get creative.",
      "**Breathe first.** If I'm jet-lagged, anxious, or just overwhelmed by a new place, I don't force a full practice. I find a quiet corner, sit, and breathe for five minutes. Everything else follows.",
      "Travel has made me a better teacher. When you practice in chaos and discomfort, you learn what the practice is really for.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}
