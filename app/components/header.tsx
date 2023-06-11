import Link from "next/link";
import Image from "next/image";
// import { MenuItem } from "types";

// interface NavbarProps {
// 	menuItems?: MenuItem[];
// }

export function Header({ menuItems }: any) {
	return (
		<header className="top-header u-pad-md">
			<h1 className="u-sr-only">HP Center Website</h1>
			<Link href="/">
				{/* <Image src="/images/logo.png" alt="logo" width="50" height="50" /> */}
				<img className="logo" src="/images/logo.png" alt="logo" />
			</Link>
			<nav className="main-nav">
				<ul>
					{menuItems &&
						menuItems.map((item: any) => {
							const refObj = item.page_ref.__expandedRef[0];
							return (
								<li key={item._key}>
									<Link href={refObj.slug.current}>{item.label}</Link>
								</li>
							);
						})}
					<li>
						<Link href="/donate" className="btn">
							Donate
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
