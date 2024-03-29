import cx from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    text: "I've been using the app for over a year now and it's made keeping track of my vehicle's service history a breeze. I always know when my car needs maintenance and I can even show the service records to my mechanic during an appointment.",
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
  const [index, setIndex] = useState(0);

  const activeTestimonial = index >= 0 ? testimonials[index] : null;

  useEffect(() => {
    const carousel = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === testimonials.length - 1) return 0;
        return prevIndex + 1;
      });
    }, 10000);

    return () => clearTimeout(carousel);
  }, []);

  if (!activeTestimonial) return null;

  return (
    <section className="py-32 even:bg-base-200">
      <div className="container">
        <div className="mx-auto flex min-h-[300px] max-w-xl flex-col items-center justify-center gap-6">
          <h2 className="mb-4 text-center text-4xl font-black capitalize leading-10 text-accent md:text-5xl lg:text-6xl">
            Testimonials
          </h2>
          {activeTestimonial ? (
            <>
              <p className="text-center font-serif text-base italic text-accent sm:text-xl md:text-2xl">
                &quot;{activeTestimonial.text}&quot;
              </p>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  width={64}
                  height={64}
                  className="mb-2 h-12 w-12 rounded-full sm:h-14 sm:w-14 md:h-16 md:w-16"
                />
                <h3 className="text-sm font-bold text-accent sm:text-base md:text-lg">
                  {activeTestimonial.name}
                </h3>
                <p className="text-center text-xs font-medium text-accent/60 sm:text-sm md:text-base">
                  {activeTestimonial.title}
                </p>
              </div>
            </>
          ) : null}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                className={cx(
                  "h-6 w-6 before:block before:h-1 before:w-6 before:rounded-full before:transition-colors before:content-[''] hover:before:bg-accent",
                  {
                    "before:bg-primary": idx !== index,
                    "before:bg-secondary": idx === index,
                  }
                )}
                aria-label={`Show testimonial number ${idx + 1}`}
                onClick={() => setIndex(idx)}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
