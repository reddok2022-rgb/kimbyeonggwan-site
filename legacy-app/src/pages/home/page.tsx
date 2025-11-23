
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Main Image */}
      <div className="mb-8 md:mb-12">
        <img 
          src="https://static.readdy.ai/image/5d3cd45d69791845655c53ef1e92ab0e/b46369d329a43e1bdeb9302049cd8e05.png"
          alt="kimbyeonggwan"
          className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/poems')}
        />
      </div>

      {/* Introduction Text */}
      <div className="w-[280px] md:w-[320px] lg:w-[350px] text-white text-center leading-relaxed">
        <p className="text-xs md:text-sm text-justify">
          안녕하세요. 시 쓰는 김병관입니다.<br /><br />
          이곳은 저의 시 연재물을 모아둔 웹페이지입니다. 사람들에게 희망과 영감을 주는 괴물 같은 이야기를 만들어내는 것이 저의 꿈입니다. 감상을 원하신다면 위의 그림을 클릭해주세요.
        </p>
      </div>
    </div>
  );
}
