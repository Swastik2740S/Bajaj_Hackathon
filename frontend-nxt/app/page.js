import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>KeepFit - Human Pose Estimation</title>
        <meta name="description" content="Number one fitness tracking app in California" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">
              <Link className="text-black text-3xl font" href="/">KeepFit</Link>
            </h1>
           
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
              <li><Link href="/about" className="text-gray-700 hover:text-blue-600">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
              <li><Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center flex items-center justify-center text-center" style={{ backgroundImage: "url('/assets/gym.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-white">
          <h2 className="text-4xl font-bold">Welcome to <span className="text-blue-400">Human Pose Estimation</span></h2>
          <p className="mt-4 text-lg">Number one fitness tracking app in California</p>
          <Link href="#about" className="mt-6 inline-block bg-blue-500 px-6 py-3 rounded-lg text-white">Read More</Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto my-16 px-4">
        
        {/* About Section */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <Image src="/img/yoga.svg" alt="Yoga" width={150} height={150} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Personalized fitness application for staying healthy</h3>
            <p className="mt-2 text-gray-600">Our program combines cutting-edge computer vision techniques to concentrate on Human Pose Estimation...</p>
          </div>
        </section>

        {/* Workout Plans */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
          <div className="text-center">
            <Image src="/img/fitness.svg" alt="Fitness" width={150} height={150} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Customizable workout plans for all fitness levels</h3>
            <p className="mt-2 text-gray-600">Individuals with varied degrees of fitness might benefit from customizable training regimens...</p>
          </div>
        </section>

        {/* Exercise Instructions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
          <div className="text-center">
            <Image src="/img/instructions.svg" alt="Instructions" width={150} height={150} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Detailed exercise instructions and videos</h3>
            <p className="mt-2 text-gray-600">AI-enabled gym apps provide thorough coaching options for a range of exercise categories...</p>
          </div>
        </section>

        {/* Analytics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
          <div className="text-center">
            <Image src="/img/graphs1.svg" alt="Graphs" width={150} height={150} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Progress tracking and analytics to monitor your results</h3>
            <p className="mt-2 text-gray-600">Our AI fitness tracking tool provides in-depth analysis of workout duration and frequency...</p>
          </div>
        </section>

      </main>

      {/* Services Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Squats</h4>
              <p className="text-gray-600 mt-2">Squats are a compound exercise that works multiple muscle groups...</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Push Ups</h4>
              <p className="text-gray-600 mt-2">Push ups are a bodyweight exercise that primarily work the chest...</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Jumping Jacks</h4>
              <p className="text-gray-600 mt-2">Jumping jacks are a cardio exercise that works the entire body...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
