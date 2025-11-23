
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="py-4 md:py-6 lg:py-8 px-4 md:px-6 border-b border-red-500">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/poems')}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base"
          >
            Series
          </button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Contact</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base"
          >
            Intro
          </button>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center space-y-8 md:space-y-12">
          {/* Image */}
          <div className="w-full max-w-xs">
            <img 
              src="https://static.readdy.ai/image/5d3cd45d69791845655c53ef1e92ab0e/3f56ee8c34128a7ba0dae77d9877f4fd.png"
              alt="Contact illustration"
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6">
            <a 
              href="mailto:comfortvelocity@naver.com"
              className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <i className="ri-mail-line text-base md:text-lg lg:text-xl"></i>
              <span className="text-sm md:text-base">comfortvelocity@naver.com</span>
            </a>
            <a 
              href="https://instagram.com/melonanearme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <i className="ri-instagram-line text-base md:text-lg lg:text-xl"></i>
              <span className="text-sm md:text-base">@melonanearme</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
