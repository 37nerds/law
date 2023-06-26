import { useState } from "react";

type Props = {
    activeIndex?: number;
};

function DocComponentsNav({ activeIndex }: Props) {
    const SECTION_NAVS = [
        { name: "Typography", isActive: activeIndex === 1 ? true : false },
        { name: "Form Input", isActive: false },
        { name: "Cards", isActive: false },
    ];
    const [navs, setNavs] = useState(SECTION_NAVS);

    const scrollToSection = (currentIndex: number) => {
        setNavs(
            navs.map((n, k) => {
                if (k === currentIndex) return { ...n, isActive: true };
                else return { ...n, isActive: false };
            })
        );
        document
            ?.getElementById("component" + (currentIndex + 1))
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <ul className="menu mt-10 w-56 text-sm">
            <li className="menu-title">
                <span className="">Components</span>
            </li>

            {navs.map((n, k) => {
                return (
                    <li
                        key={k}
                        onClick={() => scrollToSection(k)}
                        className={n.isActive ? "bordered" : ""}
                    >
                        <a>{n.name}</a>
                    </li>
                );
            })}
        </ul>
    );
}

export default DocComponentsNav;
