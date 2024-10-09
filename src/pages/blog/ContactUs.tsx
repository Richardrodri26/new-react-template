import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <section id="contactus" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Contáctanos</h2>
        
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:w-1/3">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">Estamos aquí para ayudarte</h3>
            <p className="text-gray-700 mb-6">
              Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros a través de los siguientes medios:
            </p>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Mail className="text-gray-900 mr-4" />
                <a href="mailto:info@example.com" className="text-gray-900 hover:underline">info@example.com</a>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="text-gray-900 mr-4" />
                <a href="tel:+1234567890" className="text-gray-900 hover:underline">+1 234 567 890</a>
              </div>
              <div className="flex items-center">
                <MapPin className="text-gray-900 mr-4" />
                <a
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:underline"
                >
                  Dirección: Calle Ejemplo 123, Ciudad, País
                </a>
              </div>
              {/* <div className='flex items-center mr-4 x-2'>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1594165970137!2d-122.4130496846815!3d37.78384137975735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b8b7c4315%3A0x86f7c8ae00b3a0b6!2sCalle%20Ejemplo%20123%2C%20Ciudad%2C%20Pa%C3%ADs!5e0!3m2!1ses!2ses!4v1633034625817!5m2!1ses!2ses"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                ></iframe>
              </div> */}
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:w-2/3">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">Envíanos un mensaje</h3>
            <form
              action="#"
              method="post"
              className="flex flex-col space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-gray-900 font-medium mb-2">Nombre</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-900 font-medium mb-2">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-900 font-medium mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
