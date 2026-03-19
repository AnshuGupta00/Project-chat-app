import React from 'react'

function Header2() {
  return (
    <div className='bg-red-100 '> 
    <div className="w-full px-4 sm:px-8 md:px-16">
      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src=" https://scontent.whatsapp.net/v/t39.8562-34/472789625_593649246596394_5449176563091833632_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=pWnQt5IOpFgQ7kNvwHR6QeB&_nc_oc=Admy1YPc2jU4s5eI8JQCNyyIcNB_GFKubYWevedpj5pq23LwQcrHprOpz7uaQrG_RVs&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=16NTyky3qj0ow5rFQI--BA&oh=01_Q5Aa3wGTL_wzZSCTyYAywtjalvOPN0by7ANX1n2EUVeckFnZ3Q&oe=69975CDE"
          className="w-full max-w-5xl h-auto object-cover"
          alt="WhatsApp Feature"
        />
      </div>
      {/* Text Section */}
      <div className="mt-4 text-center">
        <p className="text-2xl sm:text-4xl md:text-6xl font-semibold leading-tight">
          With private messaging and calling, you can be yourself, speak freely and feel close to the most important people in your life no matter where they are.
        </p>
      </div>
              <div className="flex justify-center">
             <img
          src=" https://scontent.whatsapp.net/v/t39.8562-34/473083383_985260680138627_8314586055954509622_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=z_dBP3VA0OUQ7kNvwHISa5t&_nc_oc=AdmJTGWBm0KJQvnPG0acqwQy1-DZUX3pdR1PX8aIiEMKVJInbwKMxmwW3qr7cAzy4fU&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=16NTyky3qj0ow5rFQI--BA&oh=01_Q5Aa3wH6-RUKZhCVZ5Ln3Of6CmVgkml3f7CGYVSiQ_zhT6ER_A&oe=6997568E"
          className="w-full max-w-5xl h-auto object-cover"
          alt="WhatsApp Feature"
        />
        </div>
    </div>
<div className="flex flex-col md:flex-row items-center aling-center justify-center px-6 py-10 gap-10 ml-4 mr-4">

  {/* Left Content */}
  <div className="flex flex-col text-center md:text-left max-w-xl">
    <p className="text-3xl sm:text-4xl font-semibold leading-tight">
      Never miss a <br /> moment with <br />
      voice and video <br />
      calls
    </p>

    <h6 className="text-gray-600 text-lg sm:text-xl mt-4">
      From a group call to classmates to a quick call with mom,
      feel like you’re in the same room with voice and video calls.
    </h6>
  </div>

  {/* Right Image */}
  <img
    src="https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/399694-smartphones-apple-iphone-11-10008711.png"
    alt="Phone"
    className="w-full max-w-[400px] h-auto object-contain"
  />

</div>
   <div className="flex justify-center items-center gap-10">

  <img src="https://scontent.whatsapp.net/v/t39.8562-34/559054604_816574444457481_6666544107012482161_n.png?stp=dst-webp&ccb=1-7&_nc_sid=73b08c&_nc_ohc=q1H-OQ4LzHoQ7kNvwHNJ21S&_nc_oc=AdmEFUedvjTp4f0Ah-COzv2A0FwT4xrtUAUhnNpimCO2O5dmknWLTqj6S5g2x1ZJIG4&_nc_zt=3&_nc_ht=scontent.whatsapp.net&_nc_gid=16NTyky3qj0ow5rFQI--BA&oh=01_Q5Aa3wGFEjilWVUzbtDfj0nR_QSoPAF0rIdgQjb1IMkz1LIuwQ&oe=69977092"
    alt="WhatsApp"
    className=""
  />

  <div className="flex flex-col">
    <p className="text-4xl font-semibold">
      Get WhatsApp <br /> for Windows
    </p>

    <h6 className="text-black-600 text-2xl mt-4">
      Chat and call on a larger screen with the desktop app.
    </h6>
    
  </div>
</div>

    </div>
  )
}

export default Header2