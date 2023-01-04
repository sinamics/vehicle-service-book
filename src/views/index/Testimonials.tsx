import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Mary Smith",
    title: "Marketing Manager at XYZ Corporation",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e2",
    text: "I used to have a hard time remembering when I last had my oil changed or tires rotated, but now with this app, it's all tracked in one convenient place. Highly recommend!",
  },
  {
    id: 2,
    name: "John Johnson",
    title: "Software Developer at ABC Tech",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e290267",
    text: "As a busy parent, it's hard to keep track of everything, but this app has made it so much easier to stay on top of my vehicle's maintenance. No more missed appointments or forgotten services!",
  },
  {
    id: 3,
    name: "Rachel Williams",
    title: "Human Resources Director at DEF Inc.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e290",
    text: "I love the alerts and reminders that this app provides. It's helped me save money by catching potential issues before they become bigger problems.",
  },
  {
    id: 4,
    name: "Jack Brown",
    title: "Sales Representative at GHI Enterprises",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29",
    text: "As someone who doesn't know much about cars, this app has been a lifesaver. It helps me understand what services my vehicle needs and when, and I feel more confident on the road knowing that my car is well-maintained.",
  },
  {
    id: 5,
    name: "Emily Jones",
    title: "Customer Service Coordinator at JKL Company",
    avatar: "https://i.pravatar.cc/150?u=a042581f",
    text: "This app has made it so much easier for me to keep track of multiple vehicles. I used to have a paper service book for each car, but now I can see everything in one place and even share the information with my mechanic. Highly recommend!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 even:bg-base-200">
      <div className="container">
        <h2 className="text-center text-4xl font-black leading-10 text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={96}
                height={96}
                className="h-24 w-24 rounded-full"
              />
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
              <p className="text-base font-medium">{testimonial.title}</p>
              <p className="text-base font-light">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
