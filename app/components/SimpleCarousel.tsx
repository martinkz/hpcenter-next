"use client";
import { useState, useEffect } from "react";

export default function SimpleCarousel({ images }: { images: string[] }) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const count = images.length;

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentSlide === count - 1) setCurrentSlide(0);
			else setCurrentSlide(currentSlide + 1);
		}, 3500);

		return () => clearInterval(interval);
	}, [currentSlide, count]);

	return (
		<div className="carousel content-inline">
			{images.map((filename: string, idx: number) => (
				<img style={{ opacity: currentSlide === idx ? 1 : 0 }} className="bgimage" src={`/images/carousel/${filename}`} key={filename} alt="" />
			))}
		</div>
	);
}
