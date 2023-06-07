import Image from "next/image";
import { getSanityData } from "./utility/sanityData";

export default function Home() {
	const DATASET = "production";
	const QUERY = encodeURIComponent('*[!(_id in path("drafts.**"))]');
	const PROJECT_URL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

	getSanityData(PROJECT_URL);
	return <div className="page">Hello world</div>;
}
