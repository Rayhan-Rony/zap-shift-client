import React, { useState, useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";

// Original testimonials data
const originalTestimonials = [
  {
    id: 1,
    quote:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: "https://via.placeholder.com/60",
    name: "Jane Doe",
    profession: "Yoga Instructor",
  },
  {
    id: 2,
    quote:
      "I've seen a significant improvement in my posture and a reduction in back pain since I started using Posture Pro. It's truly effortless!",
    image: "https://via.placeholder.com/60",
    name: "John Smith",
    profession: "Software Engineer",
  },
  {
    id: 3,
    quote:
      "Posture Pro has helped me maintain better alignment during long hours at my desk. Highly recommend it for anyone struggling with posture.",
    image: "https://via.placeholder.com/60",
    name: "Emily White",
    profession: "Graphic Designer",
  },
  {
    id: 4,
    quote:
      "The subtle support from Posture Pro reminds me to sit and stand tall, and I feel more energetic throughout the day.",
    image: "https://via.placeholder.com/60",
    name: "Michael Brown",
    profession: "Fitness Trainer",
  },
  {
    id: 5,
    quote:
      "Finally, a posture solution that's comfortable and effective! My neck stiffness has greatly reduced.",
    image: "https://via.placeholder.com/60",
    name: "Sarah Green",
    profession: "Student",
  },
  {
    id: 6,
    quote:
      "I used to slouch a lot, but Posture Pro gently corrects my posture without feeling restrictive. A game-changer!",
    image: "https://via.placeholder.com/60",
    name: "David Lee",
    profession: "Architect",
  },
  {
    id: 7,
    quote:
      "This device is a lifesaver for my WFH setup. My posture has improved, and I can focus better without discomfort.",
    image: "https://via.placeholder.com/60",
    name: "Olivia Chen",
    profession: "Product Manager",
  },
];

// Number of duplicates needed for smooth infinite looping
const numDuplicates = 2;

// Create an extended array for infinite scrolling by duplicating start/end cards
const extendedTestimonials = [
  ...originalTestimonials.slice(-numDuplicates), // Last N cards of original
  ...originalTestimonials, // All original cards
  ...originalTestimonials.slice(0, numDuplicates), // First N cards of original
];

const TestimonialCarousel = () => {
  // `activeIndex` tracks the currently *centered* card's index in the `originalTestimonials` array for pagination dots.
  const [activeIndex, setActiveIndex] = useState(0);

  // `currentIndex` tracks the currently *centered* card's index in the `extendedTestimonials` array for track positioning.
  // It starts at `numDuplicates` to visually center the first original testimonial.
  const [currentIndex, setCurrentIndex] = useState(numDuplicates);

  // State to control CSS transitions (enabled for smooth slide, disabled for instant snap)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // New state to hold the number of *logically* visible cards, updated by media queries in JS.
  // This is used for calculating the `trackTransform` for centering.
  const [logicalNumVisibleCards, setLogicalNumVisibleCards] = useState(1); // Default for smallest screens

  const trackRef = useRef(null); // Ref for the carousel track element

  // --- Effect to update `logicalNumVisibleCards` based on screen width ---
  useEffect(() => {
    // Media query definitions (must match your Tailwind config breakpoints if customized)
    const mediaQueryLg = window.matchMedia("(min-width: 1024px)"); // Corresponds to Tailwind's 'lg'
    const mediaQueryMd = window.matchMedia("(min-width: 768px)"); // Corresponds to Tailwind's 'md'

    const updateLogicalNumVisibleCards = () => {
      if (mediaQueryLg.matches) {
        setLogicalNumVisibleCards(3); // On large screens, 3 cards are logically centered
      } else if (mediaQueryMd.matches) {
        setLogicalNumVisibleCards(2); // On medium screens, 2 cards are logically centered
      } else {
        setLogicalNumVisibleCards(1); // On small screens, 1 card is logically centered
      }
    };

    // Set initial value
    updateLogicalNumVisibleCards();

    // Add listeners for changes in media query matches
    mediaQueryLg.addEventListener("change", updateLogicalNumVisibleCards);
    mediaQueryMd.addEventListener("change", updateLogicalNumVisibleCards);

    // Clean up event listeners on component unmount
    return () => {
      mediaQueryLg.removeEventListener("change", updateLogicalNumVisibleCards);
      mediaQueryMd.removeEventListener("change", updateLogicalNumVisibleCards);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // --- Core Logic for Infinite Loop Snapping ---
  useEffect(() => {
    // This effect handles the "teleportation" logic for infinite loop.
    // It runs *after* a smooth transition has visually completed (isTransitioning is false).
    if (!isTransitioning) {
      // If we've scrolled past the "real" last card (into the duplicated first cards at the end)
      if (currentIndex >= originalTestimonials.length + numDuplicates) {
        setCurrentIndex(numDuplicates); // Snap back to the first "real" card's duplicate at the start
      }
      // If we've scrolled before the "real" first card (into the duplicated last cards at the beginning)
      else if (currentIndex < numDuplicates) {
        setCurrentIndex(originalTestimonials.length + currentIndex); // Snap back to the last "real" card's duplicate at the end
      }
    }
  }, [
    currentIndex,
    originalTestimonials.length,
    numDuplicates,
    isTransitioning,
  ]);

  // --- Event Listener for Transition End (to re-enable transitions after a snap) ---
  useEffect(() => {
    const trackElement = trackRef.current;
    if (trackElement) {
      const handleTransitionEnd = () => {
        // Re-enable transition after any transition (smooth slide or instant snap) ends.
        // This ensures the next user interaction will be animated.
        setIsTransitioning(false);
      };
      trackElement.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        trackElement.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, []); // Empty dependency array, listener only needs to be set up once

  // --- Navigation Handlers ---
  const goToNext = () => {
    setIsTransitioning(true); // Enable transition for the slide
    setCurrentIndex((prev) => prev + 1); // Move track to next card
    // Update activeIndex (for dots) by wrapping around original testimonials length
    setActiveIndex((prev) => (prev + 1) % originalTestimonials.length);
  };

  const goToPrev = () => {
    setIsTransitioning(true); // Enable transition for the slide
    setCurrentIndex((prev) => prev - 1); // Move track to previous card
    // Update activeIndex (for dots) by wrapping around original testimonials length
    setActiveIndex(
      (prev) =>
        (prev - 1 + originalTestimonials.length) % originalTestimonials.length
    );
  };

  // Handler for pagination dots
  const goToDot = (originalIdx) => {
    setIsTransitioning(true); // Enable transition
    setActiveIndex(originalIdx); // Set original active index
    // Update currentIndex to point to the correct position in the extended array
    setCurrentIndex(originalIdx + numDuplicates);
  };

  // Handler for clicking on a side card
  const handleClickCard = (clickedExtIndex) => {
    // If the clicked card is already the middle one, do nothing
    if (clickedExtIndex === currentIndex) return;

    setIsTransitioning(true); // Enable transition for the slide

    // Move the track to center the clicked card
    setCurrentIndex(clickedExtIndex);

    // Find the corresponding original index to update activeIndex (for dots)
    let newActiveOriginalIndex = clickedExtIndex - numDuplicates;
    // Adjust for wrap-around if clicking duplicated cards at ends
    if (newActiveOriginalIndex < 0) {
      newActiveOriginalIndex += originalTestimonials.length;
    } else if (newActiveOriginalIndex >= originalTestimonials.length) {
      newActiveOriginalIndex -= originalTestimonials.length;
    }
    setActiveIndex(newActiveOriginalIndex);
  };

  // --- Card Styling Logic (Opacity and Scale) ---
  const getCardOpacityAndScale = (extIndex) => {
    // Calculate the difference from the current middle card in the extended list
    const diff = extIndex - currentIndex;

    if (diff === 0) {
      // Middle card: fully opaque, original scale
      return "opacity-100 scale-100 z-20";
    } else if (diff === -1 || diff === 1) {
      // Immediate left or right card: 50% opacity, slightly scaled down
      // These are the "side" cards that are always visible with partial opacity/scale.
      return "opacity-50 scale-90 z-10";
    }
    // All other cards are completely invisible and non-interactive
    return "opacity-0 scale-0 pointer-events-none z-0";
  };

  // Calculate the transform for the entire carousel track
  // This shifts the track so that the `currentIndex` card is centered within the visible window.
  // The calculation now explicitly uses `logicalNumVisibleCards` from state.
  const trackTransform = `translateX(calc(${
    -currentIndex + (logicalNumVisibleCards - 1) / 2
  } * (100% / ${logicalNumVisibleCards})))`;

  return (
    <section className="py-16 ">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">
          What our customers are saying
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* Carousel Container - This acts as the viewport/window for the carousel track */}
        {/*
          Responsive max-width for the container, controlled by Tailwind classes.
          This dictates the overall width available for the track.
        */}
        <div
          className="relative overflow-hidden w-full  mx-auto pb-10"
          style={{ height: "350px" }}
        >
          {/* Carousel Track - This flex container holds all extended testimonials and moves horizontally */}
          {/*
            The transform style dynamically positions the track.
            Individual card widths are set responsively using Tailwind classes below.
          */}
          <div
            ref={trackRef}
            className={`flex items-center h-full ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{ transform: trackTransform }} // Apply the dynamically calculated transform
          >
            {extendedTestimonials.map((testimonial, extIndex) => (
              <div
                key={extIndex} // Unique key for each card in the extended list
                // Responsive card width using Tailwind utility classes:
                // `w-full`: Full width on small screens (1 card visible)
                // `md:w-1/2`: Half width on medium screens (2 cards visible)
                // `lg:w-1/3`: One-third width on large screens (3 cards visible)
                // `px-2` adds consistent horizontal padding/gap
                className={`
                  flex-shrink-0 w-full md:w-1/2 lg:w-1/3   box-border
                  bg-white shadow-xl rounded-lg p-10
                  transform transition-all duration-500 ease-in-out
                  ${getCardOpacityAndScale(extIndex)}
                  cursor-pointer
                `}
                onClick={() => handleClickCard(extIndex)}
              >
                <div className="text-primary text-4xl mb-4">
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed line-clamp-4">
                  {testimonial.quote}
                </p>
                <div className="border-t-2 border-dashed border-gray-300 w-full mb-6"></div>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls (Arrows and Dots) */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={goToPrev}
            className="btn btn-circle btn-primary"
            aria-label="Previous testimonial"
          >
            ❮
          </button>

          <div className="flex md:gap-2 gap-1">
            {originalTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToDot(index)}
                className={`btn btn-xs btn-circle ${
                  index === activeIndex ? "btn-primary" : ""
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="btn btn-circle btn-primary"
            aria-label="Next testimonial"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
