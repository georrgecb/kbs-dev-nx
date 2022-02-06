import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import parse from "html-react-parser";
import Link from "next/link";
import JsonData from "../api/data.json";
import Image from "next/image";

const ProductPage = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Head>
        <title>{product.name} - Shop</title>
        <meta name="description" content="Product Page made with Nextjs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page Header */}
      <header className="absolute top-0 left-0 p-10">
        <Link href="/">
          <a className="font-bold hover:underline underline-offset-2 decoration-teal-400 decoration-4 cursor-pointer">
            Back to Homepage
          </a>
        </Link>
      </header>
      {/* Page Body */}
      <main className="bg-custom-page py-5 flex flex-col gap-10 lg:flex-row h-screen w-full justify-center items-center">
        {/* Product Image */}
        <section className="border-r-8 border-b-8 border-teal-400 m-5 flex justify-center items-center">
          <Image
            src={`https://loremflickr.com/450/450?random=${product.name}`}
            width={450}
            height={450}
            alt="product image"
          />
        </section>
        {/* Product Info */}
        <section className="flex-1 px-5 md:px-10 bg-gradient-to-l from-gray-100">
          {/* Product Name */}
          <h3 className="py-5 text-teal-400 text-4xl italic font-bold">
            {product.name}
          </h3>
          {/* Product Description */}
          <h5 className="text-gray-700 lg:pr-32">
            {parse(product.description)}
          </h5>
          {/* Price and Buy Button */}
          <div className="text-xl pt-10 pb-5 flex gap-5 text-gray-700">
            <div className="flex flex-col justify-center items-center border p-2">
              <span className="font-semibold">
                {Intl.NumberFormat("ro-RO", {
                  style: "currency",
                  currency: "RON",
                }).format(product.base_price)}
              </span>
              <span className="text-sm text-gray-600">before tax</span>
            </div>
            <div className="flex flex-col justify-center items-center border p-2">
              <span className="font-semibold">
                {Intl.NumberFormat("ro-RO", {
                  style: "currency",
                  currency: "RON",
                }).format(product.price)}
              </span>
              <span className="text-sm text-gray-600">after tax</span>
            </div>
            <p className="text-teal-400 rounded-md border-r-4 border-b-4 border-teal-400 border hover:border-teal-600 font-medium text-md p-3 text-center cursor-pointer flex justify-center items-center">
              Add to cart
            </p>
          </div>
          {/* Other stats */}
          <p className="flex flex-col py-5 text-sm text-gray-700">
            <span>SKU: {product.sku}</span>
            <span>Product ID:{product.id}</span>
            <span>
              Availability:{" "}
              {product.status == 1 ? "In stock." : "Out of stock."}
            </span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;

export function getStaticPaths() {
  const data = JsonData.data;

  const paths = data.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  try {
    const { slug } = params;
    const data = JsonData.data.filter((product) => product.slug == slug);
    const product = data[0];
    return { props: { product } };
  } catch (error) {
    console.log(error);
  }
}
