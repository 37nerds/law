import { dashboard_logo, dashboard_title } from "@config/base";

const LandingIntro = () => {
    return (
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
                <div className="max-w-md">
                    <h1 className="text-center text-3xl font-bold ">
                        <img
                            src={dashboard_logo}
                            className="mask mask-circle mr-2 inline-block w-12"
                            alt={dashboard_title}
                        />
                        {dashboard_title}
                    </h1>

                    <div className="mt-12 text-center">
                        <img src="/intro.png" alt="Dashwind Admin Template" className="inline-block w-48"></img>
                    </div>

                    <div>
                        <h1 className="mt-8 text-2xl font-bold">Lorem ipsum dolor sit amet atque</h1>
                        <p className="mt-4 py-2">
                            ✓ <span className="font-semibold">Consectetur/Ddipisicing</span> elit Sapiente
                        </p>
                        <p className="py-2 ">
                            ✓ <span className="font-semibold">Iure eaque</span> non est quam, odit enim fuga assumenda
                        </p>
                        <p className="py-2  ">
                            ✓ Delectus-temporibus <span className="font-semibold">repellendus</span>
                        </p>
                        <p className="mb-4  py-2">
                            ✓ <span className="font-semibold">Dolores EX</span> asperiores,{" "}
                            <span className="font-semibold">Rerum, Atque</span> support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingIntro;
