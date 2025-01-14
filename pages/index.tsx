import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppLayout from "../components/AppLayout";
import Integrations from "../components/home/Integrations";
import TorpedoStats from "../components/home/TorpedoStats";
import Torpedo from "../components/Torpedo";

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Home | Torpedo</title>
      </Head>
      <div className="py-36">
        <div className="container mx-auto px-4">
          <div className="inline-block">
            <h1 className="text-7xl font-bold text-white">
              Buy VM Runtimes with
            </h1>
            <h1
              className="text-7xl font-bold text-white inline-block mt-2"
              style={{
                background:
                  "linear-gradient(146deg, rgba(0,255,240,1) 0%, rgba(235,148,148,1) 100%)",
                //@ts-ignore
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ETH
            </h1>
            <p className="text-slate-500 text-4xl mt-7 leading-normal">
              Pay for compute by the minute. <br />
              Fully programmable.
            </p>
            <div className="mt-10">
              <Link
                className="border-2 border-blue-500 hover:bg-blue-500/60 bg-blue-500/30 text-white text-xl px-5 py-3 rounded-lg mt-7"
                href="/app"
              >
                rent
              </Link>
              <Link
                href="/about"
                className="border-2 bg-red-500/30 hover:bg-red-500/60 border-red-500 text-white text-xl px-5 py-3 rounded-lg mt-7 ml-10"
              >
                about
              </Link>
            </div>
          </div>
          <div className="-z-50 inline-block w-1/2 absolute h-screen -translate-x-40 -translate-y-40">
            <Torpedo />
          </div>
        </div>
      </div>
      <TorpedoStats />
      <Integrations />
    </AppLayout>
  );
}
