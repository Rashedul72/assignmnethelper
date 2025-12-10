"use client";

import Image from "next/image";

export default function PaymentMethodSection() {

  const paymentMethods = [
    {
      name: "Bank Transfer",
      src: "/images/bank.png",
      width: 60,
      height: 60,
    },
    {
      name: "bKash",
      src: "/images/bkash.png",
      width: 110,
      height: 110,
    },
    {
      name: "Taptap",
      src: "/images/taptap.png",
      width: 90,
      height: 90,
      
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          Payment Methods
        </h2>
        
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose from multiple secure and easy payment options for your convenience.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {paymentMethods.map((method, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <Image
                    src={method.src}
                    alt={method.name}
                    width={method.width}
                    height={method.height}
                    className="object-contain"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
