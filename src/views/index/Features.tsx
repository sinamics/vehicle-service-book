import Image from "next/image";

const features = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO of Company",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "I used to have a hard time remembering when I last had my oil changed or tires rotated, but now with this app, it's all tracked in one convenient place. Highly recommend!",
  },
  {
    id: 2,
    name: "Jane Doe",
    title: "CEO of Company",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "As a busy parent, it's hard to keep track of everything, but this app has made it so much easier to stay on top of my vehicle's maintenance. No more missed appointments or forgotten services!",
  },
  {
    id: 3,
    name: "John Doe",
    title: "CEO of Company",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "I love the alerts and reminders that this app provides. It's helped me save money by catching potential issues before they become bigger problems.",
  },
  {
    id: 4,
    name: "Jane Doe",
    title: "CEO of Company",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "As someone who doesn't know much about cars, this app has been a lifesaver. It helps me understand what services my vehicle needs and when, and I feel more confident on the road knowing that my car is well-maintained.",
  },
  {
    id: 5,
    name: "John Doe",
    title: "CEO of Company",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "This app has made it so much easier for me to keep track of multiple vehicles. I used to have a paper service book for each car, but now I can see everything in one place and even share the information with my mechanic. Highly recommend!",
  },
];

export default function Features() {
  return (
    <section className="py-20 even:bg-base-200">
      <div className="container">
        <h2 className="text-center text-4xl font-black leading-10 text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center">
              <Image
                src={feature.avatar}
                alt={feature.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full"
              />
              <h3 className="text-xl font-bold">{feature.name}</h3>
              <p className="text-base font-medium">{feature.title}</p>
              <p className="text-base font-light">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
