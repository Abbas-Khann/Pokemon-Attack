import Image from "next/image";
import Link from "next/link";
import heroImage from "../public/assets/hero.png";

const Hero = () => {
  return (
    <section className="px-2 py-20 sm:px-20 sm:py-0 text-white">
      <div className="md:flex items-center justify-around">
        <div className="md:w-3/5 px-5">
          <h2 className="font-semibold text-3xl text-skin-base my-4 leading-tight lg:text-4xl tracking-tighter lg:tracking-normal">
            Welcome to <span className="text-3xl text-skin-base my-4 leading-tight lg:text-4xl tracking-tighter
            bg-gradient-to-r bg-clip-text text-transparent
            from-[#C339AD] via-[#CD4CB5] to-purple-500
            animate-text">Pokemon-Wars</span>
          </h2>
          <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-lg sm:mb-12">
           Unlease the power of your Pokemon by leveling up and attacking other players, Earn points, win battles and take all by winning all the Eth in the Game.
          </p>
          <div
          className="flex flex-col sm:flex-row"
          >
            <Link href="/Game">
              <button className="bg-[#8900FF] py-2 px-6 rounded-sm hover:bg-gradient-to-l from-[#8900FF] to-[#D000FF] sm:mr-10 mb-5">
                Play Game
              </button>
            </Link>
            <a href="https://youtu.be/cWDF1TGlQqA" target="_blank" rel="noreferrer">
              <button className="bg-transparent border-[0.5px] border-[#8A02FF] text-[#8A02FF] py-2 px-6 rounded-sm hover:bg-gradient-to-l from-[#8900FF] to-[#D000FF] hover:text-white">
                How to Play
              </button>
            </a>
          </div>
        </div>
        <div className="w-10/12 md:w-2/4 mx-auto md:mx-0 my-8 order-2 ">
          <Image src={heroImage} alt="Hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;