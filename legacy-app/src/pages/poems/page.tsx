import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Poem {
  id: number;
  title: string;
  content: string;
  series: string;
  status: 'published' | 'upcoming';
}

const poems: Poem[] = [
  {
    id: 1,
    title: "1화 가우시안 블러",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">
  <p style="margin:0 0 .35em 0;">이 이야기는 이렇게 시작해보고 싶다</p>
  <p style="margin:0 0 .35em 0;">그녀는 등교 전 마당에서</p>
  <p style="margin:0 0 .35em 0;">축 처진</p>
  <p style="margin:0 0 .35em 0;">작은 개를 바라본다</p>
  <p style="margin:0 0 .35em 0;">개는 곧 떠날 것이다</p>
  <p style="margin:0 0 .35em 0;">그러므로 현관에 가까이 개집의 위치를 옮겨둔다</p>
  <p style="margin:0 0 .35em 0;">누군가 바쁘더라도 눈에는 들어올 수 있도록</p>

  <p style="margin:1.3em 0 0 0;">매일 오후 2시 부인이 발코니에서 티타임을 갖지 않았더라면 뭔가 달랐을까?</p>
  <p style="margin:1.3em 0 0 0;">(미관을 해친다는 이유로 개집은 집사에 의해 원위치로 돌아가게 된다)</p>

  <p style="margin:1.3em 0 0 0;">이건</p>
  <p style="margin:0 0 .35em 0;">이 집의 소통 방식을 보여주는 좋은(혹은 단적인) 예지만</p>
  <p style="margin:0 0 .35em 0;">도화선이 될 뿐이다</p>
  <p style="margin:0 0 .35em 0;">진실은 늘 옮겨져 폭발한다</p>

  <p style="margin:1.3em 0 0 0;">결국 불에 관한 이야라고 생각한다. 불은 스스로 지연되지 않으므로</p>
  <p style="margin:0 0 .35em 0;">그럼</p>
  <p style="margin:0 0 .35em 0;">그는</p>
  <p style="margin:0 0 .35em 0;">다 타버린 검은 재를 만지며 생각하는 것이다</p>

  <p style="margin:1.3em 0 0 0;">무엇이었을까</p>
  <p style="margin:0 0 .35em 0;">유추해낼 수 없는 뭔가를</p>

  <p style="margin:1.3em 0 0 0;font-size:14px;opacity:.7;">* Gaussian Blur. 가우시안 블러는 가우시안 함수에 의해 이미지가 흐려지는 결과를 의미한다. 이 이야기는 이를 비유로 한 그녀(랑)와 그(미드나잇 키튼)의 이야기다.</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 2,
    title: "2화 미지로 들어가기 위해 명심할 것 이곳에 문은 없다",
    content: `<style>
.p{font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
   font-size:18px;line-height:1.14;letter-spacing:-.01em;color:#EEE;background:transparent;text-align:left;margin:0;padding:0}
.a{margin:0 0 .35em 0}   /* 한 줄 */
.b{margin:1.3em 0 0 0}   /* 연갈이(빈 줄) */
</style>

<div class="p">
  <p class="a">문 앞에 상자가 있다</p>

  <p class="b"></p>

  <p class="a">보내는 사람엔 랑이라 적혀 있다. 상자는 소포의 형식을 띠고 있지만</p>
  <p class="a">엄밀히 말하자면</p>
  <p class="a">서류 봉투 주소 양식을 A4로 출력해 붙여놨을 뿐이다</p>
  <p class="a">키튼은 왜 우체국을 이용하지 않은 거야? 씁쓸한 웃음을 지었지만</p>
  <p class="a">한낮에 아파트 복도를 걸어오는 한 여자를 생각한다</p>
  <p class="a">없다는 걸 알고 문 앞에 상자를 두고 가려는 사려 깊은 장면을</p>

  <p class="b"></p>

  <p class="a">자신이 만든 관계로 문 앞에 상자가 도착했다</p>

  <p class="b"></p>

  <p class="a">받는 사람 : 미드나잇 키튼</p>

  <p class="b"></p>

  <p class="a">키튼은 서늘한 글자를 바라본다. 이름으로 불렸을 날씨 같은 날에 대하여</p>

  <p class="b"></p>

  <p class="a">키튼, 우리는 저녁놀을 본다</p>
  <p class="a">미드나잇은 한밤중이지? 여행지의 짧은 돌담을 손으로 훑으며 지나가는데 울퉁불퉁한 느낌이 사라지면</p>
  <p class="a">뒤를 돌아보는 거야, 거기 있었지? 곧 밤이 올 것처럼 너는?</p>
  <p class="a">의도적으로 랑은</p>
  <p class="a">문장을 의문형으로 만든다. 반응을 기다리는 것이다. 그저 서로 알고 있는 것을 말하는 것처럼…</p>

  <p class="b"></p>

  <p class="a">청유문이었는데</p>

  <p class="b"></p>

  <p class="a">키튼은 단호하게</p>
  <p class="a">눈앞에 모형 바나나를 든다</p>
  <p class="a">둘만의 표시</p>
  <p class="a">기억이 안 난다면 바나나를 들어줘</p>

  <p class="b"></p>

  <p class="a">여전히 상자는 닫혀 있다. 상자를 열면 한 권의 책과 두꺼운 노트. 에밀 아자르의『가면의 생』과 랑의 일기장이다. 그리고 금방이라도 떨어질 듯한 접착력이 약한 포스트잇, 몇 줄의 글</p>

  <p class="b"></p>

  <p class="a"><b>나는 다시 글을 쓰기 시작했다</b></p>
  <p class="a">―에밀 아자르,『가면의 생』</p>

  <p class="b"></p>

  <p class="a">상징의 가여운 점은 보여줘야 한다는 것에 있지만, 보여주지 않으면</p>
  <p class="a">내가 이곳에 있단 걸 당신은 알까요</p>

  <p class="b"></p>

  <p class="a"><b>나는 마지막으로 너를 떠올렸다</b></p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 3,
    title: "3화 그날 모두가 열중쉬어 자세에서 키티거렸고 선생들은 난감했지만 뭘 할 수 있지",
    content: `<style>
.p{font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
   font-size:18px;line-height:1.14;letter-spacing:-.01em;color:#EEE;background:transparent;text-align:left;margin:0;padding:0}
.a{margin:0 0 .35em 0}   /* 한 줄 */
.b{margin:1.3em 0 0 0}   /* 연갈이(빈 줄) */
</style>

<div class="p">
  <p class="a">부인은 침대에 누워 대충 책을 읽다 밑줄 칠 곳을 발견한다</p>
  <p class="a">희극은 죽음에 대한 두려움을 향한 인간의 본질적 반응이라고 생각합니다*</p>

  <p class="b"></p>

  <p class="a">아이는 이번 턴의 울음을 다 쏟아낸 듯하다. 부인은 다시 아이에게 향한다. 아이는 소리로 반항하지만 소용없다. 부인이 침대에 누워 비행기 자세를 취한다. 서서히 올라간다. 가장 높은 고도에서</p>
  <p class="a">아이는 땅바닥으로 떨어진다. 아이는 운다. 부인은 침대에 누워 있다. 이 환한 대낮. 무료한</p>

  <p class="b"></p>

  <p class="a">랑의 최초의 기억</p>

  <p class="b"></p>

  <p class="a">부인은 아이의 울음소리를 자장가 삼아</p>
  <p class="a">잠깐</p>
  <p class="a">졸았다가</p>
  <p class="a">잦아들면 몸을 일으켜 다시 아이에게 다가간다. 충분히 울 시간을 주고 아무도 오지 않는단 걸 알려준 것이다. 부인은 아이를 안는다. 천천히 높은 고도로 향한다</p>

  <p class="b"></p>

  <p class="a">두 상황의 평균 가속도 일치 문제</p>

  <p class="b"></p>

  <p class="a">이미지의 반란</p>
  <p class="a">: PTSD</p>

  <p class="b"></p>

  <p class="a">구령대 계단 옆 봉을 잡아도 다리가 후들거렸던 여름, 미래시의 장면에서</p>
  <p class="a">한 사람의 인생은 아무래도 상관없었다</p>

  <p class="b"></p>

  <p class="a" style="font-size:14px;opacity:.7;">* 움베르토 에코의 『작가란 무엇인가』 인터뷰 내용 중에서.</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 4,
    title: "4화 교육은 삶 전반의 기념일 or 얼룩 스타일리스트 언어 씨에게",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">

  <p style="margin:0 0 .35em 0;">언어가 우리에게 주는 단 하나의 강령은</p>
  <p style="margin:0 0 .35em 0;">쳐다본다는 것이다</p>
  <p style="margin:0 0 .35em 0;">우리가 옷가지 하나 없는 거렁뱅이일지라도</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">랑이 언어를 듣고 이해할 무렵부터 부인은 탄 음식을 종종 해주었다</p>
  <p style="margin:0 0 .35em 0;">이렇게 불에 직접 오래 구우면 타는 거란다</p>
  <p style="margin:0 0 .35em 0;">안 좋은 건가요?</p>
  <p style="margin:0 0 .35em 0;">물론이지</p>
  <p style="margin:0 0 .35em 0;">부인은</p>
  <p style="margin:0 0 .35em 0;">탄 팬케이크는 랑의 접시에 멀쩡한 건 자기의 접시에 옮겨 담는다</p>
  <p style="margin:0 0 .35em 0;">그리고 꼭 한마디를 덧붙인다</p>
  <p style="margin:0 0 .35em 0;">음식을 남기는 건 나쁜 것이란다</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">랑은 마른 장작처럼 되어갔다</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">언어의 지속적인 관심 속에서(가스라이팅의 따듯함이란)</p>
  <p style="margin:0 0 .35em 0;">그녀의 내부에 한 종류의 곰팡이가 폈다는 사실</p>
  <p style="margin:0 0 .35em 0;">감정</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">인간이 이 위계에 굴복하지 않았다면</p>
  <p style="margin:0 0 .35em 0;">장례에서 그들이 비를 맞고 서 있었을까?*</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">포클레인. 포클레인</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">랑은 이제 방에 갇혀 종일 책을 보거나, 글을 쓰거나, 노래를 부르거나, 죽고 싶거나</p>
  <p style="margin:0 0 .35em 0;">독자 노선으로 삶이 망가지게 된다</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">포클레인. 포클레인</p>
  <p style="margin:0 0 .35em 0;">땅이 한껏 도려질 때</p>
  <p style="margin:0 0 .35em 0;">인간은</p>
  <p style="margin:0 0 .35em 0;">흙을</p>
  <p style="margin:0 0 .35em 0;">제 집처럼 드나드네**</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">나는</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">(랑은 언젠가 심야 라디오 방송에서 한밤중 곰이 탈출했다는 소식을 접한 뒤</p>
  <p style="margin:0 0 .35em 0;">밖으로 나갔다가</p>
  <p style="margin:0 0 .35em 0;">경찰에게 제지당했다)</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">일기장엔 일기가 차곡히</p>
  <p style="margin:0 0 .35em 0;">무너져내린 흙처럼</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">오늘도 하염없이 해가 나를 태운다</p>
  <p style="margin:0 0 .35em 0;">슬픔은 종이비행기를 접어 날리는 일만큼</p>
  <p style="margin:0 0 .35em 0;">쉽고</p>
  <p style="margin:0 0 .35em 0;">쓸데없다</p>
  <p style="margin:0 0 .35em 0;">마른 물기 같다</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">죽음은 책임으로부터 도망치다</p>
  <p style="margin:0 0 .35em 0;">되려 책임을 죽여버린다</p>
  <p style="margin:0 0 .35em 0;">(이게 닭이 먼저냐 달걀이 먼저냐 싸움은 아닐 것이다)</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">나도 손은 그을 줄 아는데</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">피가 주룩 났어도 뜨거웠던 여름</p>
  <p style="margin:0 0 .35em 0;">오늘도 하염없이 해가 나를 태운다</p>
  <p style="margin:0 0 .35em 0;">피는 굳어 뭉쳐있다</p>
  <p style="margin:0 0 .35em 0;">몇 번째인지</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">며칠 가만히 누워 안정을 취하셔야 해요</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">파리가 내 주위에서만 앵앵거린다</p>
  <p style="margin:0 0 .35em 0;">옆 호실 애가 나를 지나치며 말했지</p>
  <p style="margin:0 0 .35em 0;">엄마 쟤 냄새나!</p>

  <p style="margin:1.3em 0 0 0;"></p>

  <p style="margin:0 0 .35em 0;">언어는 재깍재깍 해체되어 감정을 알아버린다</p>

  <p style="margin:1.3em 0 0 0;font-size:14px;opacity:.7;">* 랑의 기억 1. 할머니 거기는 흙 속이에요. 들어가 계실 건가요?</p>
  <p style="margin:0 0 .35em 0;font-size:14px;opacity:.7;">** 랑의 기억 2. 눈을 감은 사람들이 채버켓에 담겨 무더기로 떨어지고 있다. 몇 번씩이나.</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 5,
    title: "5화 구도 잡기",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">

  <p style="margin:0 0 .35em 0;">랑은 한가로운 겨울날 모처럼 자신의 생산성을 찾았다</p>
  <p style="margin:0 0 .35em 0;">추위에 떠는 개 쳐다보기</p>
  <p style="margin:0 0 .35em 0;">큰 유리(Le Grand Verre)(1915-23)*가 깨질까?</p>
  <p style="margin:0 0 .35em 0;">가족들…</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 자신의 방 커다란 창 앞에서 지난날의 풍경을 떠올릴 수 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">왜</p>
  <p style="margin:0 0 .35em 0;">지옥에서 여전히 숨 쉬는 공기를 찾아냈냐면**</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">정말 그 사람의 얼굴을 봐서</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">부인의 화장대</p>
  <p style="margin:0 0 .35em 0;">작은 스탠드 액자엔 아밍 소드를 쥔 여자가 군용 지프차에 기대어 있다. 군복을 입은 여자는 어색한 웃음을 지으며 햇살 속에 멈춰 있다</p>
  <p style="margin:0 0 .35em 0;">약간의 수줍음이 있는</p>
  <p style="margin:0 0 .35em 0;">이 이미지</p>
  <p style="margin:0 0 .35em 0;">여기서부터 시작된 망가짐이 있다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">희망</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 그날 마지막 실험으로 손목을 그었고 소리를 질렀다. 부인이 방에 도착했을 때쯤 얌전히 정신을 잃을 수 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">완전 MZ아니니?</p>
  <p style="margin:0 0 .35em 0;">랑은 덜 깨어난 정신으로 부인의 말을 듣고 있었다. 여름엔 <b>이걸</b> 찍지 못해 아쉬웠단다. 혼자 깔짝깔짝했잖니</p>
  <p style="margin:0 0 .35em 0;">피가 계속 새어 나와 괴로워하는 어린애</p>
  <p style="margin:0 0 .35em 0;">틱톡 규정 위반 영상으로 분류된 이 콘텐츠는 국립 실종·학대 아동 방지센터(NCMEC)에 신고돼 부인에게 따로 연락이 간다</p>
  <p style="margin:0 0 .35em 0;">뭐랄까, 랑은 이때 완전히 닭 쫓던 개 신세였는데</p>
  <p style="margin:0 0 .35em 0;">이유는 이랬다</p>
  <p style="margin:0 0 .35em 0;">랑은 아홉 살 때쯤</p>
  <p style="margin:0 0 .35em 0;">자신에게 주어진 가족의 의의가 무엇인지</p>
  <p style="margin:0 0 .35em 0;">시뮬레이션을 돌리곤 했다. 아빠는 해외에 연구원으로 가 있는 상태입니다. 깜깜무소식이에요. 편부모라 가정하면</p>
  <p style="margin:0 0 .35em 0;">엄마는… 랑은 그 뒤의 문장을 나름대로 만들어가기 위해</p>
  <p style="margin:0 0 .35em 0;">소리를 빽빽 지르거나</p>
  <p style="margin:0 0 .35em 0;">탈출한 곰을 보기 위해 한밤중에 나가거나</p>
  <p style="margin:0 0 .35em 0;">손목을 긋거나</p>
  <p style="margin:0 0 .35em 0;">책을 열심히 읽거나…</p>
  <p style="margin:0 0 .35em 0;">한 것이다. 자식이 돼보려고. 간접 화법으로 말하자면,</p>
  <p style="margin:0 0 .35em 0;">엄마</p>
  <p style="margin:0 0 .35em 0;">사랑은 괜찮아요. 저 여기 있어요…</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이제야 지붕을 바라보는 개</p>
  <p style="margin:0 0 .35em 0;">지붕 위엔 닭도 없었고</p>
  <p style="margin:0 0 .35em 0;">밤이 오는 게 보였다. 지붕 너머로</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">사실 부인은 남편을 사랑하지 않았다</p>
  <p style="margin:0 0 .35em 0;">부인은 남편을 사랑하지 않음에도 아이를 낳았다</p>
  <p style="margin:0 0 .35em 0;">부인은 남편을 사랑하지 않음에도 자신이 엄마가 될 거라는 사실을 알았다</p>
  <p style="margin:0 0 .35em 0;">사실 부인은 태어났을 때부터 아이를 낳기 위해 자신이 이 세상에 태어났단 것을 알고 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑이 바로 그 아이였으므로</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">겨울이었구나,</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 허무함 이후로 줄곧 창 밖을 봤다</p>
  <p style="margin:0 0 .35em 0;">커다란 창이 아닌 병원의 제한적 시간 속에서 아무 제한 없이 남들을 봤다</p>
  <p style="margin:0 0 .35em 0;">살점 한 덩이 한 덩이가 당신에게서 왔다는 생각은 이제 하지 않는다</p>
  <p style="margin:0 0 .35em 0;">병원엔 왜 데려온거지? 가끔 의문이 들었지만 물어보기엔</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이 시점을 계기로 랑에게 부인은 하나의 아이러니가 된다</p>
  <p style="margin:0 0 .35em 0;">한 명의 불온한 괴물</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">지붕 너머의 보름달</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">제발 웃지 말아줘</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;opacity:.7;font-size:14px;">* 마르셀 뒤샹. &lt;심지어, 그녀의 독신자들에 의해 발가벗겨진 신부&gt;, 줄여서 속칭 &lt;큰 유리&gt;</p>
  <p style="margin:0 0 .35em 0;opacity:.7;font-size:14px;">** 테오도르 W. 아도르노. 『미니마 모랄리아』 (길, 2005) 문장 일부 변용.</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 6,
    title: "6화 당직 생활",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">랑은 병원에서 퇴원한 뒤</p>
<p style="margin:0 0 .35em 0;">집에 돌아와 보니</p>
<p style="margin:0 0 .35em 0;">부인이 없었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">냉장고에 붙은 메모</p>
<p style="margin:0 0 .35em 0;">며칠 출장 간다고</p>
<p style="margin:0 0 .35em 0;">알아서 잘 지내라고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 혼자 남은 집에서</p>
<p style="margin:0 0 .35em 0;">처음으로 자유를 느꼈다</p>
<p style="margin:0 0 .35em 0;">아무도 감시하지 않는</p>
<p style="margin:0 0 .35em 0;">아무도 간섭하지 않는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그러나 자유는</p>
<p style="margin:0 0 .35em 0;">생각보다 무거웠다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 마당의 개를 바라봤다</p>
<p style="margin:0 0 .35em 0;">개는 여전히 축 처져 있었다</p>
<p style="margin:0 0 .35em 0;">먹이를 주어야 할까</p>
<p style="margin:0 0 .35em 0;">물을 주어야 할까</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 개에게 다가갔다</p>
<p style="margin:0 0 .35em 0;">개는 랑을 올려다봤다</p>
<p style="margin:0 0 .35em 0;">슬픈 눈으로</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">너도 외로워?</p>
<p style="margin:0 0 .35em 0;">랑이 물었다</p>
<p style="margin:0 0 .35em 0;">개는 대답하지 않았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그날 밤</p>
<p style="margin:0 0 .35em 0;">랑은 개와 함께 잠들었다</p>
<p style="margin:0 0 .35em 0;">마당에서</p>
<p style="margin:0 0 .35em 0;">별을 보며</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 7,
    title: "7화 유형",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">

  <p style="margin:0 0 .35em 0;">뒷세계는 말 그대로 뒷세계 인간의 솔직함이 토사물처럼 마구 버무려진</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">싸우고</p>
  <p style="margin:0 0 .35em 0;">미워하고</p>
  <p style="margin:0 0 .35em 0;">빼앗고</p>
  <p style="margin:0 0 .35em 0;">암시장이 열리고, 사고, 팔고, 오랜 역사와 유구한 전통. 뿌리 깊은 뒷세계</p>
  <p style="margin:0 0 .35em 0;">빈민가보다 조금 더 활발한 형태다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">히아신은 오늘도 어깨에 힘을 주며 거리를 쏘다닌다. 토끼단의 간부가 되기 위하여</p>
  <p style="margin:0 0 .35em 0;">(손목에 토끼 귀나 당근이 그려지길)</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">히아신은 수금 지역에서 과일 가판대를 엎어버리며 악당이 되고, 뒤에서 랑은 따라다니고</p>
  <p style="margin:0 0 .35em 0;">데굴데굴 굴러가던 사과 한 개를 주워</p>
  <p style="margin:0 0 .35em 0;">한 입 베어 먹은 뒤</p>
  <p style="margin:0 0 .35em 0;">더럽게 맛없네…</p>
  <p style="margin:0 0 .35em 0;">읽조리는</p>
  <p style="margin:0 0 .35em 0;">싸구려 대사까지 완벽하다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">매월 수금으로 자기 가치 증명하기. 이것이 토끼단의 미션이며 연속으로 12개월. 금액에 도달하지 못하면 탈락이다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이게 실전</p>
  <p style="margin:0 0 .35em 0;">조금만 더 시간을 달라고 비는 고개 숙인 할머니들에겐 거리낌 없이 발길질을</p>
  <p style="margin:0 0 .35em 0;">(랑은 이때 방관자였으므로 죄책감 없는 날들뿐이었다)</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">그러니까 자기만 아니면 되고, 자기만 아니면 모든 것은 꽃처럼 무해하며, 관람할 수 있고 시들어도</p>
  <p style="margin:0 0 .35em 0;">오히려 더 좋으며, 자기만 아니면</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">아무 일도 없던 것처럼 침묵할 수 있다는 사실이 우리 모두를 토사물 안에 갇혀 숨 쉬게 하시옵고 그 양분으로 꽃을 피우게 되었으나 꽃은 누가 가꾸나</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 8,
    title: "8화 여기",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">

  <p style="margin:0 0 .35em 0;">공중에서 떨어지던 게 기억나</p>
  <p style="margin:0 0 .35em 0;">따스한 대낮</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">미세하게 몸이 떨리는 랑을 보며</p>
  <p style="margin:0 0 .35em 0;">히아신은 의도치 않게 대화로 시간이 어긋나고 있음을</p>
  <p style="margin:0 0 .35em 0;">인지했다. 숙연함이 자신을 물어</p>
  <p style="margin:0 0 .35em 0;">끌고 가고 있음을</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">1인 3역 행복한 가정의 모습 폐공장 단지 컨테이너로</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 가정사를 끝마치고</p>
  <p style="margin:0 0 .35em 0;">보던 페이지를 히아신에게 보여줬다</p>
  <p style="margin:0 0 .35em 0;">유명한 바이러스 학자인 랑의 아버지 고든과 부인이 해리테트 연구회에서 찍은 사진이다</p>
  <p style="margin:0 0 .35em 0;">제목은 사이좋은 부부 관계(2010)</p>
  <p style="margin:0 0 .35em 0;">가족사진이 없는 랑은 기사로 사진을 보곤 했다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">얼굴에 짐이 있네</p>
  <p style="margin:0 0 .35em 0;">그것도 아주 무거운 짐이</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">히아신은 너스레 떨며 관상을 보는 척했다. 빈자리여서 지나쳤다는 랑의 말을 기억하며</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">점이나 보러 갈래?</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">빨간 천막 예언자는 원대한 안개 속</p>
  <p style="margin:0 0 .35em 0;">현재-미래의 이중국적을 따르고 있다</p>
  <p style="margin:0 0 .35em 0;">불 켜진 미래의 일들이 잠시 소등될 때</p>
  <p style="margin:0 0 .35em 0;">죽어가고 있음에 감사함을 느낀다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">히아신이 빨간 천막 예언자를 떠올렸던 건</p>
  <p style="margin:0 0 .35em 0;">랑이 텅 빈 고가도로(길고 긴 지난날의-결핍)를 오토바이로 지나갔으면 해서다. 조금이라도 벗어날 수 있다면</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이 마음은</p>
  <p style="margin:0 0 .35em 0;">월세를 받았기에 생긴 유대감이나 싱거운 동정심일지도 모른다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">그럼에도</p>
  <p style="margin:0 0 .35em 0;">사람은 사람으로 살아가니까</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">히아신과 랑은 천막으로 들어가기 위해 줄을 섰고</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">빨간 천막 예언자는 기다리고 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 그냥 아주 단순히 지금처럼</p>
  <p style="margin:0 0 .35em 0;">잔잔함을 꿈꾼다</p>
  <p style="margin:0 0 .35em 0;">친구가 한 명 있는 정도</p>
  <p style="margin:0 0 .35em 0;">적당히 외롭고</p>
  <p style="margin:0 0 .35em 0;">적당히 슬픈</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이해는 여벌의 옷을 필요로 하지 않으니까</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">여기 서 있는</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 9,
    title: "9화 코폴라",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
font-size:18px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;text-align:left;">

  <p style="margin:0 0 .35em 0;">둘은 암시장 구경을 했다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">법이 낳은</p>
  <p style="margin:0 0 .35em 0;">인공 자녀들이 아닌</p>
  <p style="margin:0 0 .35em 0;">사생아들을 볼 수 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">역사의 유지비는 당신의 내면의 소리로도 충분하다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">무엇을 떠올리고 있는가</p>
  <p style="margin:0 0 .35em 0;">무엇을 미워하고 있는가</p>
  <p style="margin:0 0 .35em 0;">무엇을 잊어가고 있는가</p>

  <div style="height:1.3em;"></div>
  <p style="margin:0 0 .35em 0;">-</p>
  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 히아신이 바깥으로 돌아다닌 덕에 연극도 많이 볼 수 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">오늘은 다친 새가 하늘로 날아오르기까지 풀밭에서 무너지는 고독을 표현한 이야기였다</p>
  <p style="margin:0 0 .35em 0;">긴긴밤을 헤쳐</p>
  <p style="margin:0 0 .35em 0;">언덕에서 자신을 버린 일만 떠올리던</p>
  <p style="margin:0 0 .35em 0;">날 수 없는 새의 여정이었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">상처의 수신호였다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">그리고</p>
  <p style="margin:0 0 .35em 0;">최초의 도약이 있었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">상처를 딛고 고향으로 날아가는 새</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">처음으로 응원을 받은 것 같았다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">상처를 딛고 고향으로 날아가는 새</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">처음으로 응원을 받은 것 같았다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">빨간 천막 예언자는 그날</p>
  <p style="margin:0 0 .35em 0;">곧 힘든 일이 올 거라고</p>
  <p style="margin:0 0 .35em 0;">비 오는 날 걸을 거라고</p>
  <p style="margin:0 0 .35em 0;">당신은 비에 젖은 새인 것 같았다고</p>
  <p style="margin:0 0 .35em 0;">깃털은 어디에나</p>
  <p style="margin:0 0 .35em 0;">학교에도</p>
  <p style="margin:0 0 .35em 0;">집에도</p>
  <p style="margin:0 0 .35em 0;">거리에도</p>
  <p style="margin:0 0 .35em 0;">아지트에도</p>
  <p style="margin:0 0 .35em 0;">잔뜩 빠져 있었다고</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">곧 무너뜨리러 올 운명에 대해</p>
  <p style="margin:0 0 .35em 0;">잘 지내보고 싶어서</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">일기를 썼다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">궁금했어</p>
  <p style="margin:0 0 .35em 0;">늘 불행인 듯 살아가는 네가</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은</p>
  <p style="margin:0 0 .35em 0;">지저귀는 내면의 소리를 들었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">미워하지 않아서 혼자일 수 있었다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 10,
    title: "10화 클리셰",
    content: `<div style="font-family:'Pretendard','Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-size:18px; line-height:1.14; letter-spacing:-0.01em; color:#EEE; background:transparent; text-align:left;">

  <p style="margin:0 0 .35em 0;">운명의 목소리가 음이탈하여 잘못 부를지라도</p>
  <p style="margin:0 0 .35em 0;">무너지지 않을 것</p>
  <p style="margin:0 0 .35em 0;">의지는 무덤 같은 게 아니다</p>
  <p style="margin:0 0 .35em 0;">무덤을 뚫고 나오는 손이다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 연극이 다 끝난 뒤 공연장 뒤편의 공터 바람</p>
  <p style="margin:0 0 .35em 0;">시원함을 맞으며 샘솟는 영감을 다듬었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">석불리 답을 냈던 질문에 답을 다시 내보인다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">내 삶에 누가 비평을 썼는가?</p>
  <p style="margin:0 0 .35em 0;">나폴레옹이 대지의 숨소리를 느끼듯</p>
  <p style="margin:0 0 .35em 0;">군화가 진격의 기개를 전달하듯</p>
  <p style="margin:0 0 .35em 0;">누가 내 삶에 비평을 썼는가?</p>
  <p style="margin:0 0 .35em 0;">전장은 황폐함의 자손인 양</p>
  <p style="margin:0 0 .35em 0;">먼지에 휩싸이고</p>
  <p style="margin:0 0 .35em 0;">누가 내 삶에 비평을 썼는가?</p>
  <p style="margin:0 0 .35em 0;">사실 착각인 건 아닌지</p>
  <p style="margin:0 0 .35em 0;">홀로 투구를 거꾸로(일부러) 쓰고</p>
  <p style="margin:0 0 .35em 0;">어둠에 갇혀</p>
  <p style="margin:0 0 .35em 0;">웅장했던 거라면</p>
  <p style="margin:0 0 .35em 0;">멋지게</p>
  <p style="margin:0 0 .35em 0;">허공의 칼질을</p>
  <p style="margin:0 0 .35em 0;">무아지경으로</p>
  <p style="margin:0 0 .35em 0;">하다</p>
  <p style="margin:0 0 .35em 0;">베어</p>
  <p style="margin:0 0 .35em 0;">자해로</p>
  <p style="margin:0 0 .35em 0;">흐른 피를</p>
  <p style="margin:0 0 .35em 0;">아픔이라고</p>
  <p style="margin:0 0 .35em 0;">싸움이라고</p>
  <p style="margin:0 0 .35em 0;">착각한</p>
  <p style="margin:0 0 .35em 0;">내가</p>
  <p style="margin:0 0 .35em 0;">제풀에 지쳐</p>
  <p style="margin:0 0 .35em 0;">시체가 된 걸로 치고</p>
  <p style="margin:0 0 .35em 0;">쓸쓸히</p>
  <p style="margin:0 0 .35em 0;">걷고</p>
  <p style="margin:0 0 .35em 0;">걸어</p>
  <p style="margin:0 0 .35em 0;">땅을 파</p>
  <p style="margin:0 0 .35em 0;">무덤을 만들었지</p>
  <p style="margin:0 0 .35em 0;">입구로 들어갔지</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">나는 거기 있던 것이다</p>
  <p style="margin:0 0 .35em 0;">눈을 감고 있던 것이다</p>
  <p style="margin:0 0 .35em 0;">살아있음에도</p>
  <p style="margin:0 0 .35em 0;">꿈꾸지 않은 것이다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">누가 내 삶에 비평을 썼겠는가?</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">내가</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">사실</p>
  <p style="margin:0 0 .35em 0;">쓰레기통 안의 번역본</p>
  <p style="margin:0 0 .35em 0;">아무도 못 읽겠지만</p>
  <p style="margin:0 0 .35em 0;">거기</p>
  <p style="margin:0 0 .35em 0;">서서</p>
  <p style="margin:0 0 .35em 0;">찢기까지</p>
  <p style="margin:0 0 .35em 0;">한 사실을</p>
  <p style="margin:0 0 .35em 0;">아무도 모르지…</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">찾아가려고 무덤을 갈랐다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">오래 누워 있어</p>
  <p style="margin:0 0 .35em 0;">약간은 절뚝거리며 갈 것이다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">손으로 적은 걸</p>
  <p style="margin:0 0 .35em 0;">손으로 찾으려고</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">오늘은 극단 테스트를 보는 날이었으므로 랑은 긴장감을 비유로 추월하고자 했다</p>
  <p style="margin:0 0 .35em 0;">마인드로</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">어디선가 이상한 소리가 가끔 나는 것만 빼면 평안한 날들이었다</p>
  <p style="margin:0 0 .35em 0;">요즘</p>
  <p style="margin:0 0 .35em 0;">괴상한 소리가 유독</p>
  <p style="margin:0 0 .35em 0;">많이 들렸지</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">거기까지 랑이 생각할 무렵 낡은 뒷문으로 극단 매니저가 나왔다</p>
  <p style="margin:0 0 .35em 0;">오긴 왔구나</p>
  <p style="margin:0 0 .35em 0;">매니저의 눈빛은 상대를 분명한</p>
  <p style="margin:0 0 .35em 0;">어린 애</p>
  <p style="margin:0 0 .35em 0;">대충 자신의 꿈을 좇으려 하는 열정 캐릭터</p>
  <p style="margin:0 0 .35em 0;">적당히 보내고</p>
  <p style="margin:0 0 .35em 0;">저녁으로 마라탕이나 먹을 생각이었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">큰 기대는 안 하는 게 좋아</p>
  <p style="margin:0 0 .35em 0;">매일 그렇게 문을 두드리면 원래 신고감이란다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">모멸감도 살짝 섞어주면서</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">단지 네가 어리기 때문에…</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">그러나 랑의 눈빛은 매니저의</p>
  <p style="margin:0 0 .35em 0;">완고한 폭포를</p>
  <p style="margin:0 0 .35em 0;">버티는</p>
  <p style="margin:0 0 .35em 0;">선인</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">연기자로서의 기개가 먼저였다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">매니저는 조금 당황하여</p>
  <p style="margin:0 0 .35em 0;">흠. 시작하렴</p>
  <p style="margin:0 0 .35em 0;">말했고</p>
  <p style="margin:0 0 .35em 0;">랑이 준비한 건</p>
  <p style="margin:0 0 .35em 0;">끝없이 밀려드는 요괴들과</p>
  <p style="margin:0 0 .35em 0;">싸우는 히어로</p>
  <p style="margin:0 0 .35em 0;">영웅</p>
  <p style="margin:0 0 .35em 0;">검을 끝없이 휘두르는</p>
  <p style="margin:0 0 .35em 0;">피가</p>
  <p style="margin:0 0 .35em 0;">아낌없이 튀는</p>
  <p style="margin:0 0 .35em 0;">이 이미지가 왜 떠올랐는지는 랑 스스로도 알 수 없다</p>
  <p style="margin:0 0 .35em 0;">이 이미지는 어느 날</p>
  <p style="margin:0 0 .35em 0;">소리도 없이 호령하였을 뿐</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">이것을 기억하라</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">마치 오래된 일처럼…</p>
  <p style="margin:0 0 .35em 0;">잊으면 안 되는 일처럼…</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">매니저와 랑뿐인</p>
  <p style="margin:0 0 .35em 0;">공연장 뒤편 공터</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">쌀쌀한 바람이 둘을 스쳤고</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 머릿속으로 그려지는</p>
  <p style="margin:0 0 .35em 0;">수많은 요괴를</p>
  <p style="margin:0 0 .35em 0;">자르고 죽이고 자르고 죽이고</p>
  <p style="margin:0 0 .35em 0;">자르고 죽이고</p>
  <p style="margin:0 0 .35em 0;">자르고</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">죽이다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">모든 연기가 끝났을 때</p>
  <p style="margin:0 0 .35em 0;">편견은 보존량 법칙으로 자취를 감추고</p>
  <p style="margin:0 0 .35em 0;">댓츠 나이스!</p>
  <p style="margin:0 0 .35em 0;">속으로 매니저는</p>
  <p style="margin:0 0 .35em 0;">쾌재를 부르며</p>
  <p style="margin:0 0 .35em 0;">이것저것 상상을 하는 중이었다. 어쩌면 극단의 간판스타 씨보다 더 사람을 끌어모을 수 있겠는걸?</p>
  <p style="margin:0 0 .35em 0;">매니저는 엔터테인먼트 사업 종사자 시선으로</p>
  <p style="margin:0 0 .35em 0;">적당히 재능을 칭찬하면서</p>
  <p style="margin:0 0 .35em 0;">(그러나 내색하지는 않으며)</p>
  <p style="margin:0 0 .35em 0;">괜찮네. 키워볼 만하겠어. 합격</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 세상이 멈춤을</p>
  <p style="margin:0 0 .35em 0;">느꼈다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">하두의 안개</p>
  <p style="margin:0 0 .35em 0;">바람과 함께 비를 몰고 오기 시작하다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">가끔 어디선가 이상한 소리가 나는 것을 빼도 특별한 날이었다</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">랑은 부모님 동의서가 필요하다는 것이</p>
  <p style="margin:0 0 .35em 0;">조금 걸렸지만</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">오늘따라 더 영웅의 걸음으로</p>
  <p style="margin:0 0 .35em 0;">집 앞에</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">도착</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">몰려 있는 사람들이 있었다</p>
  <p style="margin:0 0 .35em 0;">사람들은</p>
  <p style="margin:0 0 .35em 0;">랑을</p>
  <p style="margin:0 0 .35em 0;">마치</p>
  <p style="margin:0 0 .35em 0;">연기하는 배우 보는 것처럼</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">당신은 비에 젖은 새인 것 같았어요</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">오,</p>
  <p style="margin:0 0 .35em 0;">마침</p>

  <div style="height:1.3em;"></div>

  <p style="margin:0 0 .35em 0;">절뚝거리며 오는</p>
  <p style="margin:0 0 .35em 0;">예언이여</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 11,
    title: "11화 사랑은 없고 여기 바다와 함께 살아가는 거라면 어떻게 증명할 수 있겠어 모닥불을 피워놓고 춤을 추는 여우와 꼬리를 붙잡고 같이 도는 아이가 총을 맞고 쓰러졌을 때 밀렵꾼은 아직 자신의 이름을 모른다",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">괴물이 나타났다</p>
<p style="margin:0 0 .35em 0;">하두 시내 중심가에</p>
<p style="margin:0 0 .35em 0;">거대한 새의 형태로</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">사람들은 비명을 지르며 도망쳤다</p>
<p style="margin:0 0 .35em 0;">괴물은 날개를 펼치고</p>
<p style="margin:0 0 .35em 0;">하늘을 가렸다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 극단 연습을 마치고</p>
<p style="margin:0 0 .35em 0;">집으로 돌아가는 길이었다</p>
<p style="margin:0 0 .35em 0;">갑자기 들려온 소음에</p>
<p style="margin:0 0 .35em 0;">고개를 들었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">거대한 새가</p>
<p style="margin:0 0 .35em 0;">하늘에서 울고 있었다</p>
<p style="margin:0 0 .35em 0;">슬픈 울음소리였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 그 울음소리를 들으며</p>
<p style="margin:0 0 .35em 0;">이상하게도 눈물이 났다</p>
<p style="margin:0 0 .35em 0;">왜 우는지 모르겠지만</p>
<p style="margin:0 0 .35em 0;">눈물이 멈추지 않았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">괴물은 곧 사라졌다</p>
<p style="margin:0 0 .35em 0;">마치 꿈이었던 것처럼</p>
<p style="margin:0 0 .35em 0;">하지만 랑의 눈물은</p>
<p style="margin:0 0 .35em 0;">한참 후에야 멈췄다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그날 밤</p>
<p style="margin:0 0 .35em 0;">랑은 꿈을 꿨다</p>
<p style="margin:0 0 .35em 0;">자신이 새가 되어</p>
<p style="margin:0 0 .35em 0;">하늘을 나는 꿈을</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 12,
    title: "12화 상정",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">아무것도 하기 싫었다</p>
<p style="margin:0 0 .35em 0;">아니</p>
<p style="margin:0 0 .35em 0;">아무것도 할 수 없었다</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">괴물이 줄을 끊어 고목에서 떨어진 뒤였다. 괴물이 괴로워하며 어딘가로 사라진 뒤였다</p>
<p style="margin:0 0 .35em 0;">하두의 비가 느릿느릿 내렸다</p>
<p style="margin:0 0 .35em 0;">사람들이 도망갈 때 던지고 간 팝콘이 길가에 부스러져 있었다</p>
<p style="margin:0 0 .35em 0;">먹고 싶었던가</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">당신은 비에 젖은 새인 것 같았다고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">집 근처에 다 와 가자 몇몇 또래 애들이 날달걀을 던졌다</p>
<p style="margin:0 0 .35em 0;">머리에 맞추면 10점. 인정?</p>
<p style="margin:0 0 .35em 0;">그들이 담장 앞에 있어 날달걀을 맞았을 뿐</p>
<p style="margin:0 0 .35em 0;">껍질을 떼고 마당 잔디를 밟았다</p>
<p style="margin:0 0 .35em 0;">개가 죽어있었다 개를 그대로 지나쳐 집에 도착했다</p>
<p style="margin:0 0 .35em 0;">TV가 켜져 있었다</p>
<p style="margin:0 0 .35em 0;">씻고 싶었다</p>
<p style="margin:0 0 .35em 0;">물이 끊겨 있었다</p>
<p style="margin:0 0 .35em 0;">거실로 다시 나왔다</p>
<p style="margin:0 0 .35em 0;">TV가 켜져 있었다</p>
<p style="margin:0 0 .35em 0;">익숙한 듯 익숙하지 않은 아빠의 얘기로 거실이 채워지고 있었다</p>
<p style="margin:0 0 .35em 0;">아무도 없었다</p>
<p style="margin:0 0 .35em 0;">냉장고에 붙은</p>
<p style="margin:0 0 .35em 0;">메모만 하나</p>
<p style="margin:0 0 .35em 0;">다음에 또 보자고-</p>
<p style="margin:0 0 .35em 0;">엄마의 깔끔한 필기체가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 큰 집에 혼자 남아</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">불타오르는 슬픔의 적막을 본다. 연기 하나 없이 매캐할 수 있는 감정의 솔직함을 본다</p>
<p style="margin:0 0 .35em 0;">그리고 실제로 불에 탄다</p>
<p style="margin:0 0 .35em 0;">집은</p>
<p style="margin:0 0 .35em 0;">랑은 죽은 개를 안고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">깃털은 어디에나</p>
<p style="margin:0 0 .35em 0;">학교에도</p>
<p style="margin:0 0 .35em 0;">집에도</p>
<p style="margin:0 0 .35em 0;">거리에도</p>
<p style="margin:0 0 .35em 0;">아지트에도</p>
<p style="margin:0 0 .35em 0;">잔뜩 빠져 있었다고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 도처에서 자신을 해하는 악마 같은 괴롭힘에도 개를 안고 있었다</p>
<p style="margin:0 0 .35em 0;">더 이상 그것이 무언가로 보이지 않을 때까지도</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 어느 길가</p>
<p style="margin:0 0 .35em 0;">표지판 아래</p>
<p style="margin:0 0 .35em 0;">개를 묻어주었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">좋아했던 건 아니었던 것 같아</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">학교 집 사람들 거리 도시조명 재수 없다고 쫓겨난 극단 아지트에도 없다 곁에 아무도</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">언젠가 랑은</p>
<p style="margin:0 0 .35em 0;">아지트에서 새를 연기했는데 2.2평에서 날아다닐 수 있다는 것</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">월세 입금 계속했다는 것</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">컨테이너 창문의 철창이</p>
<p style="margin:0 0 .35em 0;">자유의 안쪽이 아닌 새장이라서</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },

  {
    id: 13,
    title: "13화 주행",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">몇 년 후 랑은</p>
<p style="margin:0 0 .35em 0;">생활 안정지원금 신청을 위해 센터에 왔다. 서류를 더디게 작성하는 노인이</p>
<p style="margin:0 0 .35em 0;">공무원에게 투덜거리고 있었다. 쓸 게 너무 많아. 돈을 주려는 거야?</p>
<p style="margin:0 0 .35em 0;">센터는 세월을 고려한 만큼만 친절했으므로 노인은 투덜거리며 센터의 왕이 될 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">모두 이름이 불리길 기다렸다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 유리의 침착함을 관찰하고 있었다. 창유리의 표면이 색채를 띠고 있었다. 그것은 대기 중의 수분을 흡수하여 침식된 결과라고 수업 중에 들은 기억이 있다</p>
<p style="margin:0 0 .35em 0;">유리의 간절함이란</p>
<p style="margin:0 0 .35em 0;">자리로 있는 것. 연설 소리가 저편에서 들려오고 있었다. 찬양과 외침</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">신청되었어요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">밖으로 나갔는데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">당신도?</p>
<p style="margin:0 0 .35em 0;">외국인이 텐트를 치며 말을 건네왔다. 숙식이 조금 문제라고. 그렇지만 현자께선 다 알고 계신다고. 어눌한 발음으로</p>
<p style="margin:0 0 .35em 0;">할 거 없으면 오늘 밤 같이 놀자고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">텐트는 이제 흔히 볼 수 있는 구조물이었다</p>
<p style="margin:0 0 .35em 0;">현자의 등장으로</p>
<p style="margin:0 0 .35em 0;">그는 세계를 움직일 컨베이어 벨트 풀 코드 스위치* </p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">달라질 것들이 달라졌다. 현자에 관해선 다음에 다루기로</p>
<p style="margin:0 0 .35em 0;">주목해야 하는 건</p>
<p style="margin:0 0 .35em 0;">모든 이들이 랑에게 무관심해졌다는 것이다. 늘 그렇듯</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 현재 고등학교 1학년이며</p>
<p style="margin:0 0 .35em 0;">하두</p>
<p style="margin:0 0 .35em 0;">루토나 시티 주택가에서</p>
<p style="margin:0 0 .35em 0;">자취하고 있다. 학교 끝나면 패스트푸드점 아르바이트생</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">더 이상 정신이 이상해지는 책을 읽지 않았으며</p>
<p style="margin:0 0 .35em 0;">연기도 잊었다</p>
<p style="margin:0 0 .35em 0;">감정의 물가로 굳이 들어가려 하지도 않았다. 물장구치는 아이들이 웃고 있어도</p>
<p style="margin:0 0 .35em 0;">쳐다볼 뿐</p>
<p style="margin:0 0 .35em 0;">아이들이 물가에서 손짓으로 불러도, 일기</p>
<p style="margin:0 0 .35em 0;">다음 페이지로 넘기면 잠길 정도로만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">마음은 없고 텅 빈 멋진 현대인이 된 것인데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">삶 자체가 연기인 그녀의 내부는</p>
<p style="margin:0 0 .35em 0;">돌아오는 오후</p>
<p style="margin:0 0 .35em 0;">쉽사리 군중이 될 수 있게 만들어져 갔다</p>
<p style="margin:0 0 .35em 0;">기도하지 않고 웃을 수도 있다</p>
<p style="margin:0 0 .35em 0;">침식당하지 않는다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">* 컨베이어의 사고가 발생하였을 때 긴급 정지시키기 위한 스위치.</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 14,
    title: "14화 킬링타임",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">패스트푸드점 아르바이트생의 일과란 친절에 날개를 달아 주는 일</p>
<p style="margin:0 0 .35em 0;">보내야만 해서</p>
<p style="margin:0 0 .35em 0;">18 to 24</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">로이에 교복을 입은 중학생들이 코코 카드 주세요, 랑에게 말했다</p>
<p style="margin:0 0 .35em 0;">현재는 이벤트 기간</p>
<p style="margin:0 0 .35em 0;">새로 출시된 셀렉트 버거 세트를 사면</p>
<p style="margin:0 0 .35em 0;">신작 RPG 게임 &lt;애프터 셀렉트&gt;의 캐릭터 카드를 고를 수 있다</p>
<p style="margin:0 0 .35em 0;">랑은 주문 리스트를 확인한 뒤</p>
<p style="margin:0 0 .35em 0;">매대 수납함에서 코코 캐릭터 카드 한 장을 뽑아 건네주었다</p>
<p style="margin:0 0 .35em 0;">코코는</p>
<p style="margin:0 0 .35em 0;">차원의 지팡이를 이용해 이계의 마법으로 적을 처단하는 캐릭터</p>
<p style="margin:0 0 .35em 0;">특히 10대들에게 인기가 많다</p>
<p style="margin:0 0 .35em 0;">덕질 요소를 갖춘 카리스마가 카드 전면에도 드러나 있다</p>
<p style="margin:0 0 .35em 0;">코코보다 세 배는 더 커다란 차원의 지팡이, 크기가 커 프린팅도 잘린</p>
<p style="margin:0 0 .35em 0;">무기를</p>
<p style="margin:0 0 .35em 0;">코코는 싱긋 웃으며 들고 있다. 자신감이 넘치는 듯하다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저희 다섯 개 시켰는데요?</p>
<p style="margin:0 0 .35em 0;">로이에 학교 중학생들은 랑에게 짜증을 냈다</p>
<p style="margin:0 0 .35em 0;">앗, 잠시만 기다려주세요</p>
<p style="margin:0 0 .35em 0;">랑은 주문 리스트를 다시 확인한다</p>
<p style="margin:0 0 .35em 0;">셀렉트 버거 세트 X 1</p>
<p style="margin:0 0 .35em 0;">셀렉트 버거 단품 X 2</p>
<p style="margin:0 0 .35em 0;">스파이시 버거 단품 X 1</p>
<p style="margin:0 0 .35em 0;">클래식 버거 세트 X 1</p>
<p style="margin:0 0 .35em 0;">적용 대상은 셀렉트 버거 세트만 해당하여 캐릭터 카드 또한 한 장임을 랑은 확인했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">설명했다. 이벤트 명시 사항을. 공지의 위치를. 정확한 정보와 고객에 대한 공감을. 불편 사항에 대한 이해를. 끝으로 죄송함을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">아, 그럼 바꿔주세요. 전부</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 시간제로 일하는 이 패스트푸드점은 주문을 무인 기계로 받은 뒤</p>
<p style="margin:0 0 .35em 0;">주방에 전달되는 시스템으로</p>
<p style="margin:0 0 .35em 0;">이미 주문을 들어갔으나</p>
<p style="margin:0 0 .35em 0;">랑은 메뉴를 바꿀 수 있는지 물어봤고</p>
<p style="margin:0 0 .35em 0;">버거와 세트는 준비되고 있었다. 나올 준비를 마치고 있었다</p>
<p style="margin:0 0 .35em 0;">그러니 죄송합니다, 고개를 숙이는데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">진짜 개짜증나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">로이에 학교 중학생들은 주문한 음식이 나오자 테이블로 사라졌다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">요즘 많이 팔리죠?</p>
<p style="margin:0 0 .35em 0;">점장은 랑에게 근교에 좋은 카페가 있다고 말하는 사람이다</p>
<p style="margin:0 0 .35em 0;">주말에 뭐 하는지 묻는 사람이다</p>
<p style="margin:0 0 .35em 0;">랑의 신비한 분위기와 예쁜 얼굴을 좋아하는 사람이다</p>
<p style="margin:0 0 .35em 0;">네</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">손님은 온다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">리시드 주세요</p>
<p style="margin:0 0 .35em 0;">코코를</p>
<p style="margin:0 0 .35em 0;">오신카를</p>
<p style="margin:0 0 .35em 0;">…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">셀렉트 버거 세트는 불티나게 팔려나가고</p>
<p style="margin:0 0 .35em 0;">랑은 바쁘고</p>
<p style="margin:0 0 .35em 0;">패스트푸드점 아르바이트생의 일과란 친절에 날개를 달아 주는 일</p>
<p style="margin:0 0 .35em 0;">보내는 것이어서</p>
<p style="margin:0 0 .35em 0;">18 to 24</p>
<p style="margin:0 0 .35em 0;">그나저나 광고를 요즘 많이 한다고 해도</p>
<p style="margin:0 0 .35em 0;">이 정도 인기라니</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그러니 죄송합니다, 고개를 숙이는데</p>
<p style="margin:0 0 .35em 0;">오늘은 카드가 다 떨어졌어요. 정말 죄송합니다</p>
<p style="margin:0 0 .35em 0;">일과를 마치고서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">어디 방향으로 가세요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">멀리 여행 다녀오려고요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">24시 야간 버스를 타고 랑은 여행 떠나지 않았다</p>
<p style="margin:0 0 .35em 0;">금요일이 아니었더라면 다른 이유를 댔을 것이다. 점장의 플러팅을 피하기 위해</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">마른 컵라면 용기. 라벨지를 두른 빈 물병. 물기 없는 수세미. 열린 창문으로 공기의 전생. 화이트톤 인테리어. 그러니 하얀 침묵</p>
<p style="margin:0 0 .35em 0;">랑은 집에 돌아와</p>
<p style="margin:0 0 .35em 0;">석양이 진다</p>
<p style="margin:0 0 .35em 0;">1인칭 슈팅 게임 &lt;오버워치&gt;를 한다. 캐서디란 캐릭터의 궁극기를 쓴다. 캐서디는 말한다. 석양이 진다</p>
<p style="margin:0 0 .35em 0;">게임 진짜 더럽게 하네</p>
<p style="margin:0 0 .35em 0;">오늘도 채팅창은 평화롭다. 극찬을 들으며 새벽을 정주행하고 있다. 랑이 게임에 빠지게 된 이유</p>
<p style="margin:0 0 .35em 0;">게임은 자신을 숨기는 데 유효하며, 드러내는데 유효하다</p>
<p style="margin:0 0 .35em 0;">내일은 주말이기에 랑은 밤새 게임이나 할 생각이었으나 게임 내 보이스톡. 점장이 생각나는 목소리가</p>
<p style="margin:0 0 .35em 0;">목소리 너무 예쁘세요, 하는 탓에</p>
<p style="margin:0 0 .35em 0;">게임도 지고</p>
<p style="margin:0 0 .35em 0;">기분도 졌다</p>
<p style="margin:0 0 .35em 0;">스윗한 그들의 목소리는 어디에나 빠짐없이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">&lt;오버워치&gt;를 종료하고 새벽의 환향을 본다</p>
<p style="margin:0 0 .35em 0;">불을 끈</p>
<p style="margin:0 0 .35em 0;">화이트톤 인테리어가 모니터의 144hz 빛의 분산으로 춘광사설*春光乍洩를 말한다 </p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">생각 없이 킨 웹사이트에선 &lt;애프터 셀렉트&gt;의 광고가 나오고 있다</p>
<p style="margin:0 0 .35em 0;">무한 자유도 RPG &lt;애프터 셀렉트&gt; 당신은 어디로 가나요?</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">RPG는 혼자 하면 재미없어 안 해왔던 것인데</p>
<p style="margin:0 0 .35em 0;">이번 주말을 보내기엔 어쩌면 최적이라는 생각을. 킬링타임으로</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그리고 인기가 너무 많으니 한 번쯤은 좋겠지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 게임을 받으며 회원가입하고</p>
<p style="margin:0 0 .35em 0;">트레일러 영상을 하나 봤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그들은 영웅. 우리도 길을 걸을 수 있겠죠</p>
<p style="margin:0 0 .35em 0;">천사는 날개가 없으면 외로울까요?</p>
<p style="margin:0 0 .35em 0;">많은 캐릭터가 자신의 욕망을 위해 빛에 다가선다</p>
<p style="margin:0 0 .35em 0;">빛은 사라진다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">게임이 켜진다</p>
<p style="margin:0 0 .35em 0;">커스터마이징으로 초대된다</p>
<p style="margin:0 0 .35em 0;">이제 아무도 알아보지 못하는 곳에서, 익명성 속에서</p>
<p style="margin:0 0 .35em 0;">랑은 커스터마이징 중 토끼탈을 쓰고 당근을 들고 있는 모습이 마음에 들었다</p>
<p style="margin:0 0 .35em 0;">예전 생각도 나고</p>
<p style="margin:0 0 .35em 0;">히아신은 잘 지내고 있으려나</p>
<p style="margin:0 0 .35em 0;">이 모습은 왠지 유머가 넘쳐 보인다</p>
<p style="margin:0 0 .35em 0;">모니터 속</p>
<p style="margin:0 0 .35em 0;">토끼탈로 정체를 숨기고 당근을 쥔 캐릭터</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">자신의 모습이</p>
<p style="margin:0 0 .35em 0;">어쩐지 다른 타입의 운명으로 느껴짐</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 현실 시각으로 일요일 오전</p>
<p style="margin:0 0 .35em 0;">과일 가게에서 사과를 하나 훔쳐 달아났다</p>
<p style="margin:0 0 .35em 0;">과일 가게 주인 NPC가 쫓아왔다</p>
<p style="margin:0 0 .35em 0;">그러나 과일 가게 주인 NPC는 스텟으로 체력을 찍지 않아 금방</p>
<p style="margin:0 0 .35em 0;">지쳤다</p>
<p style="margin:0 0 .35em 0;">숨을 헉헉거렸다</p>
<p style="margin:0 0 .35em 0;">야 이 좀도둑아! 다시 보이면 그땐 죽어!</p>
<p style="margin:0 0 .35em 0;">랑은 사과를 베어 물며 HP를 회복했다. 사과 꼭지를 땅에 휙 던졌다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">커뮤니티에서 들은 얘기였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">무한 자유도 RPG &lt;애프터 셀렉트&gt;는 우리의 의지로 흘러갑니다</p>
<p style="margin:0 0 .35em 0;">총괄 디렉터 오트보르자는 게임 설명에 대한 마무리 멘트로</p>
<p style="margin:0 0 .35em 0;">1초간 고민한 뒤</p>
<p style="margin:0 0 .35em 0;">이것은 혁명입니다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그 장면을 모두 보고 있었다. 오트보르자는 &lt;애프터 셀렉트&gt; 총괄 디렉터 이전</p>
<p style="margin:0 0 .35em 0;">병아리</p>
<p style="margin:0 0 .35em 0;">정확하게 말하자면 화면상으로만 드러나는 병아리 캐릭터. 그의 정체나 존재 모두</p>
<p style="margin:0 0 .35em 0;">온라인으로만 만날 수 있었다</p>
<p style="margin:0 0 .35em 0;">그날 프레젠테이션 역시 맵을 돌아다니며, 가상 공간에서의</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그러니까 정말 인간의 의지</p>
<p style="margin:0 0 .35em 0;">도망치는 것도 잡히는 것도 잡히지 않는 것도 구차한 것도</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 현실 시각으로 일요일 오후</p>
<p style="margin:0 0 .35em 0;">과일 가게에서 땀 흘리고 있는 주인 NPC를 보았다</p>
<p style="margin:0 0 .35em 0;">여름이었다</p>
<p style="margin:0 0 .35em 0;">그의 땀이 목젖을 타고 흐른다</p>
<p style="margin:0 0 .35em 0;">옷 안으로 흐른다</p>
<p style="margin:0 0 .35em 0;">가만히 있어도 더운 여름 상에서</p>
<p style="margin:0 0 .35em 0;">랑은 이번엔</p>
<p style="margin:0 0 .35em 0;">1.5kg 바나나를 들고 도망쳤다. 야!!</p>
<p style="margin:0 0 .35em 0;">과일 가게 주인은 신고 있던 슬리퍼를 랑에게 던졌다</p>
<p style="margin:0 0 .35em 0;">랑이 뒤통수를 맞았다</p>
<p style="margin:0 0 .35em 0;">토끼탈을 쓰고 있었으나</p>
<p style="margin:0 0 .35em 0;">일반 슬리퍼의 데미지로 HP가 미미하게 깎였다</p>
<p style="margin:0 0 .35em 0;">달렸다</p>
<p style="margin:0 0 .35em 0;">가만히 있어도 더운 여름 상에서</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">한 손엔 당근을</p>
<p style="margin:0 0 .35em 0;">한 손엔 바나나</p>
<p style="margin:0 0 .35em 0;">이상한 희열을 온몸으로, 땀으로 느끼고 있었다</p>
<p style="margin:0 0 .35em 0;">스텟으로 체력을 찍지 않아 과일 가게 주인이 주저앉았다</p>
<p style="margin:0 0 .35em 0;">랑은 과일 가게 주인을 쳐다보았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">과일 가게 주인의 표정을 모르겠다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">커뮤니티에서 들은 얘기였다</p>
<p style="margin:0 0 .35em 0;">오픈 첫날</p>
<p style="margin:0 0 .35em 0;">경범죄로 조사받은 사람들이 있다고. 중범죄로 잡히지 않은 사람들이 있다고. 그 중엔 살인죄도 있어</p>
<p style="margin:0 0 .35em 0;">이 점으로 PK(Player Kill)도 자연스러운 점을 확인할 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이런 게 게임?</p>
<p style="margin:0 0 .35em 0;">교실 뒷자리에서 한 무리가 떠들고 있었다. 나 이번에 리시드로 부캐 팠잖아</p>
<p style="margin:0 0 .35em 0;">나쁜 짓 좀 하려고</p>
<p style="margin:0 0 .35em 0;">그거 위험한 거 아님? 2차 보이드 어떡함?</p>
<p style="margin:0 0 .35em 0;">게임은 괜찮을걸? 가짜잖아</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">교실 안의 소리가 제각각이었다. 역사의 뒷머리가 자라는 소리였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">한쪽에선</p>
<p style="margin:0 0 .35em 0;">2차 보이드에 관한 얘기도 있었다, 유명한 배우가 마침내 돌이 되었다는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 아버지 고든을 떠올렸다</p>
<p style="margin:0 0 .35em 0;">유포자라던 고든은 여전히 행방불명이었지만 현자라는 인물이 나온 뒤 빠르게 묻혀갔다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그들은 잊지 못할 것이다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">모두가 끔찍한 시기를 겪었던 그 시간을</p>
<p style="margin:0 0 .35em 0;">2차 보이드에 걸리면 누구든 괴성과 함께 괴로웠다. 일정 시간에 거쳐</p>
<p style="margin:0 0 .35em 0;">서서히 돌이 되어가는 과정에 이르렀다</p>
<p style="margin:0 0 .35em 0;">석상만 있는 장소가 있다. 애도의 일이었다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 15,
    title: "15화 대칭",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">주말이 끝나고 학교</p>
<p style="margin:0 0 .35em 0;">랑은 게임 세계의 주민을 뒤로하고</p>
<p style="margin:0 0 .35em 0;">교실로</p>
<p style="margin:0 0 .35em 0;">들어갔다</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt;에 대한 얘기가 여기저기서 들려왔다</p>
<p style="margin:0 0 .35em 0;">무한 자유도 RPG</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 주말 동안 즐겁게 세상을 누볐다</p>
<p style="margin:0 0 .35em 0;">그건 누빈 것이었다. 이게 가능한가 싶을 정도로 게임이 이상했기에</p>
<p style="margin:0 0 .35em 0;">자유는 미래처럼 정해져 있지 않고</p>
<p style="margin:0 0 .35em 0;">스토리는 캐릭터를 끌고 온 뒤 답을 인간의 의지에 맡겼다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 현실 시각으로 일요일 오전</p>
<p style="margin:0 0 .35em 0;">과일 가게에서 사과를 하나 훔쳐 달아났다</p>
<p style="margin:0 0 .35em 0;">과일 가게 주인 NPC가 쫓아왔다</p>
<p style="margin:0 0 .35em 0;">그러나 과일 가게 주인 NPC는 스텟으로 체력을 찍지 않아 금방</p>
<p style="margin:0 0 .35em 0;">지쳤다</p>
<p style="margin:0 0 .35em 0;">숨을 헉헉거렸다</p>
<p style="margin:0 0 .35em 0;">야 이 좀도둑아! 다시 보이면 그땐 죽어!</p>
<p style="margin:0 0 .35em 0;">랑은 사과를 베어 물며 HP를 회복했다. 사과 꼭지를 땅에 휙 던졌다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">커뮤니티에서 들은 얘기였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">무한 자유도 RPG &lt;애프터 셀렉트&gt;는 우리의 의지로 흘러갑니다</p>
<p style="margin:0 0 .35em 0;">총괄 디렉터 오트보르자는 게임 설명에 대한 마무리 멘트로</p>
<p style="margin:0 0 .35em 0;">1초간 고민한 뒤</p>
<p style="margin:0 0 .35em 0;">이것은 혁명입니다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그 장면을 모두 보고 있었다. 오트보르자는 &lt;애프터 셀렉트&gt; 총괄 디렉터 이전</p>
<p style="margin:0 0 .35em 0;">병아리</p>
<p style="margin:0 0 .35em 0;">정확하게 말하자면 화면상으로만 드러나는 병아리 캐릭터. 그의 정체나 존재 모두</p>
<p style="margin:0 0 .35em 0;">온라인으로만 만날 수 있었다</p>
<p style="margin:0 0 .35em 0;">그날 프레젠테이션 역시 맵을 돌아다니며, 가상 공간에서의</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그러니까 정말 인간의 의지</p>
<p style="margin:0 0 .35em 0;">도망치는 것도 잡히는 것도 잡히지 않는 것도 구차한 것도</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 현실 시각으로 일요일 오후</p>
<p style="margin:0 0 .35em 0;">과일 가게에서 땀 흘리고 있는 주인 NPC를 보았다</p>
<p style="margin:0 0 .35em 0;">여름이었다</p>
<p style="margin:0 0 .35em 0;">그의 땀이 목젖을 타고 흐른다</p>
<p style="margin:0 0 .35em 0;">옷 안으로 흐른다</p>
<p style="margin:0 0 .35em 0;">가만히 있어도 더운 여름 상에서</p>
<p style="margin:0 0 .35em 0;">랑은 이번엔</p>
<p style="margin:0 0 .35em 0;">1.5kg 바나나를 들고 도망쳤다. 야!!</p>
<p style="margin:0 0 .35em 0;">과일 가게 주인은 신고 있던 슬리퍼를 랑에게 던졌다</p>
<p style="margin:0 0 .35em 0;">랑이 뒤통수를 맞았다</p>
<p style="margin:0 0 .35em 0;">토끼탈을 쓰고 있었으나</p>
<p style="margin:0 0 .35em 0;">일반 슬리퍼의 데미지로 HP가 미미하게 깎였다</p>
<p style="margin:0 0 .35em 0;">달렸다</p>
<p style="margin:0 0 .35em 0;">가만히 있어도 더운 여름 상에서</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">한 손엔 당근을</p>
<p style="margin:0 0 .35em 0;">한 손엔 바나나</p>
<p style="margin:0 0 .35em 0;">이상한 희열을 온몸으로, 땀으로 느끼고 있었다</p>
<p style="margin:0 0 .35em 0;">스텟으로 체력을 찍지 않아 과일 가게 주인이 주저앉았다</p>
<p style="margin:0 0 .35em 0;">랑은 과일 가게 주인을 쳐다보았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">과일 가게 주인의 표정을 모르겠다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">커뮤니티에서 들은 얘기였다</p>
<p style="margin:0 0 .35em 0;">오픈 첫날</p>
<p style="margin:0 0 .35em 0;">경범죄로 조사받은 사람들이 있다고. 중범죄로 잡히지 않은 사람들이 있다고. 그 중엔 살인죄도 있어</p>
<p style="margin:0 0 .35em 0;">이 점으로 PK(Player Kill)도 자연스러운 점을 확인할 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이런 게 게임?</p>
<p style="margin:0 0 .35em 0;">교실 뒷자리에서 한 무리가 떠들고 있었다. 나 이번에 리시드로 부캐 팠잖아</p>
<p style="margin:0 0 .35em 0;">나쁜 짓 좀 하려고</p>
<p style="margin:0 0 .35em 0;">그거 위험한 거 아님? 2차 보이드 어떡함?</p>
<p style="margin:0 0 .35em 0;">게임은 괜찮을걸? 가짜잖아</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">교실 안의 소리가 제각각이었다. 역사의 뒷머리가 자라는 소리였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">한쪽에선</p>
<p style="margin:0 0 .35em 0;">2차 보이드에 관한 얘기도 있었다, 유명한 배우가 마침내 돌이 되었다는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 아버지 고든을 떠올렸다</p>
<p style="margin:0 0 .35em 0;">유포자라던 고든은 여전히 행방불명이었지만 현자라는 인물이 나온 뒤 빠르게 묻혀갔다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그들은 잊지 못할 것이다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">모두가 끔찍한 시기를 겪었던 그 시간을</p>
<p style="margin:0 0 .35em 0;">2차 보이드에 걸리면 누구든 괴성과 함께 괴로웠다. 일정 시간에 거쳐</p>
<p style="margin:0 0 .35em 0;">서서히 돌이 되어가는 과정에 이르렀다</p>
<p style="margin:0 0 .35em 0;">석상만 있는 장소가 있다. 애도의 일이었다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 16,
    title: "16화 건조",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">랑은 잠시 하려 했던 &lt;애프터 셀렉트&gt;를</p>
<p style="margin:0 0 .35em 0;">평일엔 새벽</p>
<p style="margin:0 0 .35em 0;">주말엔 내내</p>
<p style="margin:0 0 .35em 0;">하게 되었다. 자유라고 하는 것</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">지금 멀쩡해 보인다고 아무렇지 않은 게 아니다</p>
<p style="margin:0 0 .35em 0;">우리는 현재와 손을 잡으려고 얼마만큼 아파야 하나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 캐릭터 커스터마이징할 때 토끼탈을 선택하고 당근을 쥔 건 해소와 관련된 것이다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">다 기억하고 있다고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">도덕이 정말 옳은가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 10일 차였던 월요일 새벽</p>
<p style="margin:0 0 .35em 0;">랑은 아르바이트 마치고 게임에 접속</p>
<p style="margin:0 0 .35em 0;">도시에 소환되자마자</p>
<p style="margin:0 0 .35em 0;">경찰들이 쫓아왔다</p>
<p style="margin:0 0 .35em 0;">난데없이 추격전이었는데</p>
<p style="margin:0 0 .35em 0;">경찰들의 체력이 꽤 높은 수치를 자랑해</p>
<p style="margin:0 0 .35em 0;">7km나 뛰어야 했다</p>
<p style="margin:0 0 .35em 0;">그렇지만 랑은 잡히지 않는다</p>
<p style="margin:0 0 .35em 0;">이러려고 올(All) 체력으로 스텟을 찍었기 때문</p>
<p style="margin:0 0 .35em 0;">도망치려고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 빈 건물</p>
<p style="margin:0 0 .35em 0;">옥상의 정경을 경찰들 따돌리고</p>
<p style="margin:0 0 .35em 0;">바라봤다. 시티 라이트</p>
<p style="margin:0 0 .35em 0;">신고가 누적된 거겠지</p>
<p style="margin:0 0 .35em 0;">랑은 미온수 한 병을 마시며 생각했다</p>
<p style="margin:0 0 .35em 0;">과일 가게 사과, 바나나 훔친 것부터 시작된</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">사실 랑은 실험해본 것이었다. 여기선 어떻게 할지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">경범죄로 잡히고 평범하게 퀘스트 받으며 몬스터나 잡을 것인가</p>
<p style="margin:0 0 .35em 0;">취직할 것인가</p>
<p style="margin:0 0 .35em 0;">혹은 자영업</p>
<p style="margin:0 0 .35em 0;">아카데미 입학?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">대범죄자가 되어 악명을 떨치고 싶은데? 가상 공간의 목소리에 불과하더라도</p>
<p style="margin:0 0 .35em 0;">다 기억하고 있다고</p>
<p style="margin:0 0 .35em 0;">이게 뭐냐고</p>
<p style="margin:0 0 .35em 0;">누군가에겐 의미가 없을지라도</p>
<p style="margin:0 0 .35em 0;">그래서 의미인 건데? 복수는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 잠시 하려 했던 &lt;애프터 셀렉트&gt;를 평일엔 새벽 주말엔 내내</p>
<p style="margin:0 0 .35em 0;">하게 되었다. 게임 내에서도</p>
<p style="margin:0 0 .35em 0;">커뮤니티에서도</p>
<p style="margin:0 0 .35em 0;">네임드로 거듭나기 시작한다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">서풍의 토끼탈 혹은 당근좌</p>
<p style="margin:0 0 .35em 0;">(서풍은 일반적으로 방향성 바람 가운데 가장 온화하고 가장 순조로운 바람으로 간주된다)</p>
<p style="margin:0 0 .35em 0;">조용한 스텝으로</p>
<p style="margin:0 0 .35em 0;">상대의 목을 베는</p>
<p style="margin:0 0 .35em 0;">(무기의 외형은 당근이지만 이는 외형 스킨이다. 당근의 실제 물성은 검이다)</p>
<p style="margin:0 0 .35em 0;">캐시 아이템은 거의 없고 오로지 컨트롤과 실력만이 전부인</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt;에서의 랑의 재능은</p>
<p style="margin:0 0 .35em 0;">오늘도 빛이 나고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">칼은</p>
<p style="margin:0 0 .35em 0;">겨눈다는 데 의미가 있는 것. 향한다는 것. 향함은 방향을 안다는 것</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">미온수 한 병을 마시며</p>
<p style="margin:0 0 .35em 0;">토끼탈</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">시티 라이트</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 17,
    title: "17화 전야",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">마지막으로 할 말은?</p>
<p style="margin:0 0 .35em 0;">테이프로 입막음 당한 중년 남성이</p>
<p style="margin:0 0 .35em 0;">읍읍</p>
<p style="margin:0 0 .35em 0;">뭐라</p>
<p style="margin:0 0 .35em 0;">뭐라 말했다</p>
<p style="margin:0 0 .35em 0;">철제 의자에 트렁크 팬티 차림으로 앉아 있던 그가</p>
<p style="margin:0 0 .35em 0;">가운뎃손가락을 펼 때</p>
<p style="margin:0 0 .35em 0;">안녕-</p>
<p style="margin:0 0 .35em 0;">빵, 권총 소리가 폐건물의 습관을 지나쳤다. 결국 조용해지는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">유저는 한번 죽으면 캐릭터가 삭제됐다</p>
<p style="margin:0 0 .35em 0;">NPC도 마찬가지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">유저의 경우</p>
<p style="margin:0 0 .35em 0;">계정이 사라지는 것은 아니어서</p>
<p style="margin:0 0 .35em 0;">다른 캐릭터를 생성해낼 수 있겠지만</p>
<p style="margin:0 0 .35em 0;">이름은 사라지는 것이다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">NPC의 경우</p>
<p style="margin:0 0 .35em 0;">부활 같은 장치는 없고</p>
<p style="margin:0 0 .35em 0;">스토리 진행이 바뀌었다. 네가 우리 어머니를 죽였구나. 이 원수. 내 검을 받아라!</p>
<p style="margin:0 0 .35em 0;">복수극도</p>
<p style="margin:0 0 .35em 0;">일어나는데(실제로 커뮤니티에서 관련 인기 게시물도 있다)</p>
<p style="margin:0 0 .35em 0;">한 개체</p>
<p style="margin:0 0 .35em 0;">개체마다</p>
<p style="margin:0 0 .35em 0;">스토리가 있는 것이고, 이는 변화할 수 있다</p>
<p style="margin:0 0 .35em 0;">타의에</p>
<p style="margin:0 0 .35em 0;">주변 환경에 의해서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">일반 라이트 유저의 경우 이러한 혼돈을 달갑지 않게 생각하지만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">NPC 킬러단이 있다</p>
<p style="margin:0 0 .35em 0;">그들은 너무나 흔해진 MMORPG의 진행과</p>
<p style="margin:0 0 .35em 0;">만렙(혹은 경험치)</p>
<p style="margin:0 0 .35em 0;">따위에</p>
<p style="margin:0 0 .35em 0;">지긋지긋해져 있으므로</p>
<p style="margin:0 0 .35em 0;">새로움을 원했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">NPC 킬러단</p>
<p style="margin:0 0 .35em 0;">그들은 NPC만을 전문으로 살해하며 이 게임의 스토리는 어디로 가고 있는지</p>
<p style="margin:0 0 .35em 0;">모두가 궁금할 때</p>
<p style="margin:0 0 .35em 0;">어떤 플레이어도</p>
<p style="margin:0 0 .35em 0;">앞을 예상할 수 없다는 것이</p>
<p style="margin:0 0 .35em 0;">이 게임의</p>
<p style="margin:0 0 .35em 0;">화제성의 이유기도 하다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 총괄 디렉터 오트보르자는 위와 같은 스토리 진행과 게임 상황에 대해</p>
<p style="margin:0 0 .35em 0;">공식적으로 밝힌 바 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이것이 바로</p>
<p style="margin:0 0 .35em 0;">우리의 자유입니다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">병아리 캐릭터는 가상 공간에서의 모이를 쪼아대며, 느긋이 말했다. 이곳은 어쩌면</p>
<p style="margin:0 0 .35em 0;">현실</p>
<p style="margin:0 0 .35em 0;">그 이상</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">일인칭 Non-Targeting</p>
<p style="margin:0 0 .35em 0;">(그러나 삼인칭으로 옵션 변경은 가능한)</p>
<p style="margin:0 0 .35em 0;">무한 자유도</p>
<p style="margin:0 0 .35em 0;">MMORPG</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt;</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저와 함께 떠날 준비가 되셨나요?</p>
<p style="margin:0 0 .35em 0;">캐릭터 코코는 자신의 등 뒤로 손을 내민다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">게임 속 도시의 전광판에서</p>
<p style="margin:0 0 .35em 0;">캐릭터 광고가 나오는 것이었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">오늘은 코코네</p>
<p style="margin:0 0 .35em 0;">귀엽긴 해</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 폐건물에서 멀찍이 있는</p>
<p style="margin:0 0 .35em 0;">그러나 커다란</p>
<p style="margin:0 0 .35em 0;">도시의 전광판 속 캐릭터</p>
<p style="margin:0 0 .35em 0;">코코를 보고 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">아르바이트할 때는</p>
<p style="margin:0 0 .35em 0;">또래 애들이 다 코코만 찾아서</p>
<p style="margin:0 0 .35em 0;">조금</p>
<p style="margin:0 0 .35em 0;">반감이 생기기도 했는데</p>
<p style="margin:0 0 .35em 0;">확실히…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">살기가 느껴졌다. 닌자 캐릭터 오신카의 표창이 토끼탈을 아슬아슬하게 스쳐 지나갔다</p>
<p style="margin:0 0 .35em 0;">괜히 소문이 난 건 아니네?</p>
<p style="margin:0 0 .35em 0;">폐건물의 어둠 속에서</p>
<p style="margin:0 0 .35em 0;">누군가</p>
<p style="margin:0 0 .35em 0;">정체를 드러내지 않고</p>
<p style="margin:0 0 .35em 0;">말했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">너 같은 애들이 한 트럭인데 내가 죽겠니?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">닌자 캐릭터 오신카의</p>
<p style="margin:0 0 .35em 0;">닌자술은</p>
<p style="margin:0 0 .35em 0;">급습에 유리하다. 최초의 일격이 실패할 경우</p>
<p style="margin:0 0 .35em 0;">아무래도</p>
<p style="margin:0 0 .35em 0;">닌자로서의 메리트는 떨어지는 편</p>
<p style="margin:0 0 .35em 0;">그러므로</p>
<p style="margin:0 0 .35em 0;">어둠 속에</p>
<p style="margin:0 0 .35em 0;">여전히</p>
<p style="margin:0 0 .35em 0;">있는 것이다. 기척을 지우고</p>
<p style="margin:0 0 .35em 0;">살기를 지우고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 화면을 일인칭으로 고정해놓았다. 이편이 즐기기에 좋기 때문이다. 정밀 타격도 되고</p>
<p style="margin:0 0 .35em 0;">스릴이</p>
<p style="margin:0 0 .35em 0;">누군가 죽이려고 하는 모습이</p>
<p style="margin:0 0 .35em 0;">감정이</p>
<p style="margin:0 0 .35em 0;">기회가</p>
<p style="margin:0 0 .35em 0;">어떤</p>
<p style="margin:0 0 .35em 0;">변화가</p>
<p style="margin:0 0 .35em 0;">미세한 흐름이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">게임 내 피지컬로는 지금까지</p>
<p style="margin:0 0 .35em 0;">져본 적 없다</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">그러니 살아있는 것이다. 서풍의 토끼탈</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">닌자 오신카의 스킬이</p>
<p style="margin:0 0 .35em 0;">발동됐다. 고속 전진</p>
<p style="margin:0 0 .35em 0;">소리도 없이</p>
<p style="margin:0 0 .35em 0;">형체는 이미</p>
<p style="margin:0 0 .35em 0;">랑의</p>
<p style="margin:0 0 .35em 0;">등 뒤로</p>
<p style="margin:0 0 .35em 0;">그러나</p>
<p style="margin:0 0 .35em 0;">쳐다보고 있다</p>
<p style="margin:0 0 .35em 0;">토끼탈이</p>
<p style="margin:0 0 .35em 0;">아무 표정도 없이</p>
<p style="margin:0 0 .35em 0;">캐릭터 오신카의 수리검을</p>
<p style="margin:0 0 .35em 0;">손가락으로</p>
<p style="margin:0 0 .35em 0;">가벼이</p>
<p style="margin:0 0 .35em 0;">튕겨낸 후</p>
<p style="margin:0 0 .35em 0;">눈 한쪽을</p>
<p style="margin:0 0 .35em 0;">동공을</p>
<p style="margin:0 0 .35em 0;">베었다. 어떻게 죽는지는 바라보라고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그는 괴로워했다</p>
<p style="margin:0 0 .35em 0;">닉네임이 이제야</p>
<p style="margin:0 0 .35em 0;">보였다</p>
<p style="margin:0 0 .35em 0;">베리스트롱가이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 손가락 마디마디</p>
<p style="margin:0 0 .35em 0;">다 찌른 뒤</p>
<p style="margin:0 0 .35em 0;">베리스트롱가이</p>
<p style="margin:0 0 .35em 0;">소리 지르게 놔뒀다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">오늘도 도시의 야경이 아름다웠다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이런 짜릿함이 좋은 것이었다</p>
<p style="margin:0 0 .35em 0;">랑은 정해지지 않은</p>
<p style="margin:0 0 .35em 0;">자신의 의지로 개척하는</p>
<p style="margin:0 0 .35em 0;">운명의 소리가</p>
<p style="margin:0 0 .35em 0;">듣기 좋은 것이었다. 피비린내 나는 전장 속의</p>
<p style="margin:0 0 .35em 0;">외침이</p>
<p style="margin:0 0 .35em 0;">점차 사라져가는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저 생의 소리가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">게임을 종료했다. 랑은</p>
<p style="margin:0 0 .35em 0;">오늘도 학교에</p>
<p style="margin:0 0 .35em 0;">가야 하기에</p>
<p style="margin:0 0 .35em 0;">새벽 4시</p>
<p style="margin:0 0 .35em 0;">루토나 시티 주택가</p>
<p style="margin:0 0 .35em 0;">조용함</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">다음 날 학교</p>
<p style="margin:0 0 .35em 0;">교실은</p>
<p style="margin:0 0 .35em 0;">아침부터 떠들썩했는데</p>
<p style="margin:0 0 .35em 0;">내용을 들어보니</p>
<p style="margin:0 0 .35em 0;">오늘 아침</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 새로운 업데이트 공지가 떴다는 것이었다</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">슬쩍</p>
<p style="margin:0 0 .35em 0;">폰으로 내용을 확인했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">[천공의 유적지 : 영웅의 시작]</p>
<p style="margin:0 0 .35em 0;">첫 번째 서바이벌 시즌이 열린다는 내용이었다</p>
<p style="margin:0 0 .35em 0;">과연</p>
<p style="margin:0 0 .35em 0;">현시점 최강자는 누구인가?</p>
<p style="margin:0 0 .35em 0;">누가 살아남을 것인가?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">커뮤니티 댓글에서는</p>
<p style="margin:0 0 .35em 0;">서풍의 토끼탈이 나올 것인가?</p>
<p style="margin:0 0 .35em 0;">그래도</p>
<p style="margin:0 0 .35em 0;">K가 최고 아닐까?</p>
<p style="margin:0 0 .35em 0;">고스트 스토어도 잊지 말라구</p>
<p style="margin:0 0 .35em 0;">벌써</p>
<p style="margin:0 0 .35em 0;">몇몇 이들이 입방아에 오르내린다. 랑은 흥미로웠다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">과연</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">쟤네들은 저런 게 재밌나 봐</p>
<p style="margin:0 0 .35em 0;">다른 반인 히네는</p>
<p style="margin:0 0 .35em 0;">머리칼을 쓸어내리며 랑 옆에 앉았다. 랑은 뭔가 검색하다 핸드폰을 집어넣는 척</p>
<p style="margin:0 0 .35em 0;">맞장구쳤다. 그러게</p>
<p style="margin:0 0 .35em 0;">주말에 마라탕?</p>
<p style="margin:0 0 .35em 0;">노노. 이번 주 아르바이트 좀 빡세서 주말엔 쉬어야 함</p>
<p style="margin:0 0 .35em 0;">히네는</p>
<p style="margin:0 0 .35em 0;">으</p>
<p style="margin:0 0 .35em 0;">이유가 매번 너무 다양해!</p>
<p style="margin:0 0 .35em 0;">약속을 잡을 때마다 도망가는 랑을 보며 입을 삐죽 내밀었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">종이 쳤다</p>
<p style="margin:0 0 .35em 0;">1교시가 시작될 것이다</p>
<p style="margin:0 0 .35em 0;">1교시는 마음 단련 시간</p>
<p style="margin:0 0 .35em 0;">히네는 자리에서</p>
<p style="margin:0 0 .35em 0;">일어나며</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">다음엔 꼭 먹자. 애들도 너랑 놀고 싶어 해. 진심</p>
<p style="margin:0 0 .35em 0;">손을 흔들며</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">응응. 조만간</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑의 대답과</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">조만간-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">슬쩍</p>
<p style="margin:0 0 .35em 0;">폰으로 커뮤니티를 보며</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">댓글을</p>
<p style="margin:0 0 .35em 0;">반응을</p>
<p style="margin:0 0 .35em 0;">교실의 점차 잦아드는 소리를</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그래</p>
<p style="margin:0 0 .35em 0;">내가 여기 있어</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 18,
    title: "18화 1 Round - 거대 개구리의 습격",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">분홍빛 오후는 노을을 표현하는 게임 속 장치</p>
<p style="margin:0 0 .35em 0;">때문에</p>
<p style="margin:0 0 .35em 0;">깨끗한 흰 구름과</p>
<p style="margin:0 0 .35em 0;">맑은 하늘이 몽상처럼 느껴지기도 했다</p>
<p style="margin:0 0 .35em 0;">거대 개구리 떼의 습격으로 부서지고 있는 마을에선</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">현재</p>
<p style="margin:0 0 .35em 0;">이 마을은 거대 개구리 떼의 습격을 받고 있다</p>
<p style="margin:0 0 .35em 0;">2층 빌라 크기의 거대 개구리들이 마을을 부수며</p>
<p style="margin:0 0 .35em 0;">어디론가 향하고 있다</p>
<p style="margin:0 0 .35em 0;">이 과정에서 죽은 NPC와 유저들이 있다</p>
<p style="margin:0 0 .35em 0;">랑은 거대 개구리 떼 속에서</p>
<p style="margin:0 0 .35em 0;">부서진 작은 집의 잔해에 들어갔다</p>
<p style="margin:0 0 .35em 0;">무너진 벽이었다</p>
<p style="margin:0 0 .35em 0;">랑은 벽을 세워</p>
<p style="margin:0 0 .35em 0;">벽에 기대</p>
<p style="margin:0 0 .35em 0;">땅울림을 들었다</p>
<p style="margin:0 0 .35em 0;">끝없는 흙먼지의 휘몰아침 속</p>
<p style="margin:0 0 .35em 0;">지나감의 소리였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">[천공의 유적지 : 영웅의 시작]</p>
<p style="margin:0 0 .35em 0;">새 공지를 봤던</p>
<p style="margin:0 0 .35em 0;">아르바이트하던</p>
<p style="margin:0 0 .35em 0;">상황으로</p>
<p style="margin:0 0 .35em 0;">돌아가본다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">오늘 24시</p>
<p style="margin:0 0 .35em 0;">시작한다던</p>
<p style="margin:0 0 .35em 0;">첫 번째 서바이벌 시즌 [천공의 유적지 : 영웅의 시작]</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 깜짝 놀랐던 건 상금이었다</p>
<p style="margin:0 0 .35em 0;">우승 상금</p>
<p style="margin:0 0 .35em 0;">30,000부르(한화로 현재 약 1억 6천 500만 원)</p>
<p style="margin:0 0 .35em 0;">어떤 예고도 없이 시작된 이제 막 오픈한</p>
<p style="margin:0 0 .35em 0;">게임 내 시즌의 상금이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">틈틈이 아르바이트하며 본 커뮤니티는 역시 난리였다</p>
<p style="margin:0 0 .35em 0;">갓겜부터</p>
<p style="margin:0 0 .35em 0;">시작하여</p>
<p style="margin:0 0 .35em 0;">왜 미리 공지를 안 하냐? 이럴 줄 알았으면 더 열심히 했지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 익숙한 커뮤니티 내 싸움을 보다</p>
<p style="margin:0 0 .35em 0;">우선 MMORPG에서 이런 경우가 있었나?</p>
<p style="margin:0 0 .35em 0;">대회도 아니고</p>
<p style="margin:0 0 .35em 0;">상금을 게임 내에서</p>
<p style="margin:0 0 .35em 0;">이 정도 규모로 거는 경우가</p>
<p style="margin:0 0 .35em 0;">30,000부르</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 점장을 쳐다봤다</p>
<p style="margin:0 0 .35em 0;">눈이 마주쳤다</p>
<p style="margin:0 0 .35em 0;">점장이 눈웃음을 지었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">관둘 수 있나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">매장은 조용했다. 사람들이 귀에 꽂고 있는 무선 이어폰에서</p>
<p style="margin:0 0 .35em 0;">재생되고 있는 음악은 대부분 클래식일 거라고</p>
<p style="margin:0 0 .35em 0;">랑은 예상했다. 여기서 벗어날 순 없겠지</p>
<p style="margin:0 0 .35em 0;">이 상황에선</p>
<p style="margin:0 0 .35em 0;">2차 보이드와 관련하여</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">돈이 아무리 많더라도</p>
<p style="margin:0 0 .35em 0;">어려우려나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">치료받기 위하여</p>
<p style="margin:0 0 .35em 0;">현자를 만나기 위하여 전 세계 사람들이 줄 서 있다는 소식은</p>
<p style="margin:0 0 .35em 0;">이제</p>
<p style="margin:0 0 .35em 0;">너무도</p>
<p style="margin:0 0 .35em 0;">일상적인 얘기</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">수많은 텐트를 떠올려봤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">30,000부르라면</p>
<p style="margin:0 0 .35em 0;">바로 만날 수 있을까?</p>
<p style="margin:0 0 .35em 0;">무리?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 왠지 떠올려봤다. 자신이 현자와 만나는 순간을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">아픈 것도</p>
<p style="margin:0 0 .35em 0;">주변에 누가 있는 것도 아니면서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그만큼 체감이 어려운 금액이었다</p>
<p style="margin:0 0 .35em 0;">상상을 이것저것 한 뒤에야</p>
<p style="margin:0 0 .35em 0;">룰이 눈에 들어왔다</p>
<p style="margin:0 0 .35em 0;">이 부분부턴</p>
<p style="margin:0 0 .35em 0;">실제 맵 안에서 GM이 설명을 시작했다</p>
<p style="margin:0 0 .35em 0;">[천공의 유적지 : 영웅의 시작]은</p>
<p style="margin:0 0 .35em 0;">최종의 결전</p>
<p style="margin:0 0 .35em 0;">천공의 유적지로 향하기 위한</p>
<p style="margin:0 0 .35em 0;">서바이벌</p>
<p style="margin:0 0 .35em 0;">최종 라운드에는 오직 단 2명만이 올라갈 수 있으며</p>
<p style="margin:0 0 .35em 0;">이 말은</p>
<p style="margin:0 0 .35em 0;">유적지로 향하기 위해선 2명 안에</p>
<p style="margin:0 0 .35em 0;">들어야 하고</p>
<p style="margin:0 0 .35em 0;">1 Round</p>
<p style="margin:0 0 .35em 0;">2 Round</p>
<p style="margin:0 0 .35em 0;">3 Round</p>
<p style="margin:0 0 .35em 0;">선별 과정을 거친다</p>
<p style="margin:0 0 .35em 0;">서바이벌 시즌에서는 특수 제작된 맵에서 진행을 하기에</p>
<p style="margin:0 0 .35em 0;">죽어도 캐릭터가 사라지지 않는다</p>
<p style="margin:0 0 .35em 0;">1 Round는 금일 24시부터</p>
<p style="margin:0 0 .35em 0;">4일간</p>
<p style="margin:0 0 .35em 0;">진행되며</p>
<p style="margin:0 0 .35em 0;">누적으로 견디는 시간이 제일 많은</p>
<p style="margin:0 0 .35em 0;">참가 신청 인원의 절반이</p>
<p style="margin:0 0 .35em 0;">살아남는다</p>
<p style="margin:0 0 .35em 0;">1 Round는 개구리 습격에서 살아남기</p>
<p style="margin:0 0 .35em 0;">4일간</p>
<p style="margin:0 0 .35em 0;">열심히 버텨보시길</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">아르바이트 끝나고</p>
<p style="margin:0 0 .35em 0;">씻고</p>
<p style="margin:0 0 .35em 0;">접속했다</p>
<p style="margin:0 0 .35em 0;">게임엔</p>
<p style="margin:0 0 .35em 0;">다른 차원으로 이동하는</p>
<p style="margin:0 0 .35em 0;">캐릭터들이</p>
<p style="margin:0 0 .35em 0;">많았다</p>
<p style="margin:0 0 .35em 0;">빛으로 들어가고 있는 모습이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그곳을 넘어가자</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">무너지고 있는 마을이 보였다</p>
<p style="margin:0 0 .35em 0;">카운팅되고 있는 시간이 보였다</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">정신을 차리고</p>
<p style="margin:0 0 .35em 0;">정보를 수집했다. 추정하건대</p>
<p style="margin:0 0 .35em 0;">이 마을의 크기는 꽤 넓다</p>
<p style="margin:0 0 .35em 0;">꽃집</p>
<p style="margin:0 0 .35em 0;">약국</p>
<p style="margin:0 0 .35em 0;">방앗간</p>
<p style="margin:0 0 .35em 0;">무너진 것이 많지만 건물도 다양하며, </p>
<p style="margin:0 0 .35em 0;">숨을 공간을 창출할 수도 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그럼 거대 개구리는 강한가?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 칼을 들어</p>
<p style="margin:0 0 .35em 0;">지나가는 개구리의 다리를 베었다</p>
<p style="margin:0 0 .35em 0;">피가 쏟아졌다</p>
<p style="margin:0 0 .35em 0;">랑은 피를 다 맞았다</p>
<p style="margin:0 0 .35em 0;">개구리가 난폭해졌다</p>
<p style="margin:0 0 .35em 0;">개구리가 공격했다</p>
<p style="margin:0 0 .35em 0;">못 피할 정도는 아니다. 난폭해진 개구리는 속도는 줄지만, 공격력은 더 올라가는 듯하다</p>
<p style="margin:0 0 .35em 0;">파인</p>
<p style="margin:0 0 .35em 0;">면적의 범위가 다르다. 깊이가 다르다. 이를 이용한다면</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 격전지의 상황을 살펴보다</p>
<p style="margin:0 0 .35em 0;">마을을 둘러싼 원기둥 형태의</p>
<p style="margin:0 0 .35em 0;">검은 적막을 본다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">거대 개구리 떼가 그곳으로 들어가는 모습을 본다</p>
<p style="margin:0 0 .35em 0;">사라지는 거대 개구리 떼를 본다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">아마 이 1 Round는 지속해서</p>
<p style="margin:0 0 .35em 0;">마을 바깥 범위의</p>
<p style="margin:0 0 .35em 0;">원기둥</p>
<p style="margin:0 0 .35em 0;">검은 적막을 향해 사라지는</p>
<p style="margin:0 0 .35em 0;">거대 개구리를 피해</p>
<p style="margin:0 0 .35em 0;">버티는 시간을 누적해야 할 것이다</p>
<p style="margin:0 0 .35em 0;">차원의 문에서</p>
<p style="margin:0 0 .35em 0;">4일간 나오는 개구리를 피하면 될 것이다</p>
<p style="margin:0 0 .35em 0;">일반적이라면,</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 자신의 상황을 생각한다</p>
<p style="margin:0 0 .35em 0;">4일의 카운트다운</p>
<p style="margin:0 0 .35em 0;">고등학교에 다니는 랑으로서는</p>
<p style="margin:0 0 .35em 0;">절대 무리</p>
<p style="margin:0 0 .35em 0;">물론 30,000부르를 선택한다면</p>
<p style="margin:0 0 .35em 0;">학교쯤이야</p>
<p style="margin:0 0 .35em 0;">안 가도 그만이지만</p>
<p style="margin:0 0 .35em 0;">랑은 그런 걸 떠나</p>
<p style="margin:0 0 .35em 0;">이건 어쩌면 기회라는 생각이 들었다. 방해자들을 이참에 다 죽인다면</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">눈에 보이는 대로 다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이 생각을 하는 게 랑뿐만이 아닌 게 흠이었다. 하필 그 대상이 랑이라는 것도</p>
<p style="margin:0 0 .35em 0;">서풍의 토끼탈을 노리는</p>
<p style="margin:0 0 .35em 0;">집단이 있음을</p>
<p style="margin:0 0 .35em 0;">랑도 감지하고 있었다. 언제든 들어와. 다 죽여줄 테니</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">땅울림</p>
<p style="margin:0 0 .35em 0;">끝없는 흙먼지의 휘몰아침 속</p>
<p style="margin:0 0 .35em 0;">총탄이</p>
<p style="margin:0 0 .35em 0;">마법이</p>
<p style="margin:0 0 .35em 0;">저주가</p>
<p style="margin:0 0 .35em 0;">닌자술</p>
<p style="margin:0 0 .35em 0;">주먹이</p>
<p style="margin:0 0 .35em 0;">포박이</p>
<p style="margin:0 0 .35em 0;">대포가</p>
<p style="margin:0 0 .35em 0;">요정이</p>
<p style="margin:0 0 .35em 0;">검기가</p>
<p style="margin:0 0 .35em 0;">온다. 거대 개구리 떼의 지나감</p>
<p style="margin:0 0 .35em 0;">소리 속에서</p>
<p style="margin:0 0 .35em 0;">이 모든 것의 정확한 판별은</p>
<p style="margin:0 0 .35em 0;">랑조차</p>
<p style="margin:0 0 .35em 0;">어려운 것이었고</p>
<p style="margin:0 0 .35em 0;">겨우</p>
<p style="margin:0 0 .35em 0;">단 하나의 일격이 뺨을 스쳤다. 랑에게 데미지가 약간 들어왔다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">많긴 많은데…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이곳저곳에서</p>
<p style="margin:0 0 .35em 0;">모습을 드러낸 집단은</p>
<p style="margin:0 0 .35em 0;">입 모양으로 뭐라 뭐라 즐거운 듯 말하고 있었지만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑에게 닿지 않았다. 다만 공격이 최선의 방어</p>
<p style="margin:0 0 .35em 0;">랑은 저주 계열</p>
<p style="margin:0 0 .35em 0;">마법사부터 단번에 죽였다. 신음은 들리지 않았다. 이 전장은 그런 곳이다</p>
<p style="margin:0 0 .35em 0;">소리가 사라지는 곳이다</p>
<p style="margin:0 0 .35em 0;">죽이고 피하며 생존하는 것</p>
<p style="margin:0 0 .35em 0;">서바이벌. 랑은 모든 계산을, 그리고 계산을 뛰어넘는 운을 보여주며</p>
<p style="margin:0 0 .35em 0;">버티고 있었지만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">사각지대의 총탄</p>
<p style="margin:0 0 .35em 0;">이를 감지할 수는 없었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">캐릭터는 사라지지 않는다</p>
<p style="margin:0 0 .35em 0;">여기서 죽어도</p>
<p style="margin:0 0 .35em 0;">그러나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">총탄이 토끼탈의 머리를 꿰뚫으려 한 순간</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 인지했다</p>
<p style="margin:0 0 .35em 0;">끝났음을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이 전장은 그런 곳이다</p>
<p style="margin:0 0 .35em 0;">소리가 사라지는 곳이다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">땅울림</p>
<p style="margin:0 0 .35em 0;">끝없는 흙먼지의 휘몰아침 속</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이렇게 죽다니</p>
<p style="margin:0 0 .35em 0;">랑은 죽기 전 입가에 씁쓸한 미소를 지었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">다른 총탄이 이를 빗겨 쳐내기 전까진</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 느낄 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이건</p>
<p style="margin:0 0 .35em 0;">실수가 아닌</p>
<p style="margin:0 0 .35em 0;">명백한 의도다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">다른 총탄이 날아온 방향을 보았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">끝없는 흙먼지의 휘몰아침 속에서</p>
<p style="margin:0 0 .35em 0;">땅울림</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">해골 가면이 걸어오고 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">그 이름을 보고 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">끝없는 흙먼지의 휘몰아침 속에서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">미드나잇 키튼</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 19,
    title: "19화 1 Round – 거대 개구리의 습격 2",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">해골 가면은 이런 건 익숙하다는 듯</p>
<p style="margin:0 0 .35em 0;">일상적인 워킹으로</p>
<p style="margin:0 0 .35em 0;">흙먼지 속에서 천천히</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그가 조용히 난사라 읊조리자</p>
<p style="margin:0 0 .35em 0;">하늘을 포함한 전 범위에서 총탄이 날아왔다</p>
<p style="margin:0 0 .35em 0;">땅</p>
<p style="margin:0 0 .35em 0;">마을의 집 창가</p>
<p style="margin:0 0 .35em 0;">꽃잎들에서도</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그건 지금껏 랑이 본 적 없는 광경이었다. 자신을 죽이려 한 광포의 집단과</p>
<p style="margin:0 0 .35em 0;">거대 개구리 떼</p>
<p style="margin:0 0 .35em 0;">어쩌면 이곳의 모든 존재가 사라졌을지도 모르겠다고 랑은 생각했다</p>
<p style="margin:0 0 .35em 0;">실제로 모든 소리가 잦아들자 정적이</p>
<p style="margin:0 0 .35em 0;">해골 가면이 흙먼지를 잠시 멈추었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K</p>
<p style="margin:0 0 .35em 0;">랑은 언젠가 마주쳐야만 했던 그를</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">바라보고 있었다. 그가 걸친 망토가 바람에 휘날리고 있었다</p>
<p style="margin:0 0 .35em 0;">1위 길드 SCENE의 정예이자</p>
<p style="margin:0 0 .35em 0;">미개척 던전 개척률 1위</p>
<p style="margin:0 0 .35em 0;">최고의 총잡이 혹은 최고의 플레이어</p>
<p style="margin:0 0 .35em 0;">그의 손으로부터 모든 건 시작된다. 갓즈 핸드(God's Hand)</p>
<p style="margin:0 0 .35em 0;">피의 축제</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그를 지칭하는 말은 무던히도 많았지만, 오늘의 장면은 몸속 깊이 차오르는 뜨거움이었다. 저게</p>
<p style="margin:0 0 .35em 0;">K</p>
<p style="margin:0 0 .35em 0;">랑은 그의 길드 호칭을 슬쩍 봤다. 미드나잇 키튼. 한밤중의 고양이? 고양이가 밤을 걷는다. 랑은 현실 세계에서</p>
<p style="margin:0 0 .35em 0;">창밖을 봤다. 밤이 기울어지고 있었다. 밤 유저라는 뜻인가? 왠지 어울리네</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">다시 거대 개구리 떼가 아무 일 없었다는 듯 소환됐지만 묘하게 둘을 피해 갔다</p>
<p style="margin:0 0 .35em 0;">둘만의 장소였다</p>
<p style="margin:0 0 .35em 0;">지근거리에서 흙먼지가 일었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">자리 옮길까요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">왠지 모르게 랑은 따라가게 되는 형국이었는데</p>
<p style="margin:0 0 .35em 0;">푸른 언덕으로 향하는 길이었다. 꽃도 있고, 나비도 있고</p>
<p style="margin:0 0 .35em 0;">들판이 나오고</p>
<p style="margin:0 0 .35em 0;">거대 개구리 떼가 지나가는 것을 지켜볼 수 있었다</p>
<p style="margin:0 0 .35em 0;">이런 곳이 있었구나</p>
<p style="margin:0 0 .35em 0;">랑은 지형을 다 파악했다 생각했는데</p>
<p style="margin:0 0 .35em 0;">검은 적막에 도달하기 전 아슬아슬 걸쳐 있는 언덕이었다. 흙먼지가 유독 많이 번지는</p>
<p style="margin:0 0 .35em 0;">그래서 안 보이는</p>
<p style="margin:0 0 .35em 0;">K는 푸른 언덕으로 올라가기 전 입구에 무선 선풍기를 놔뒀다. 바람이</p>
<p style="margin:0 0 .35em 0;">흙먼지를 덜어냈다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">둘은 푸른 언덕에 앉아 흙먼지에 뒤덮인 마을을 내려다보고 있었다</p>
<p style="margin:0 0 .35em 0;">랑은 K를 믿는 건 아니었으나</p>
<p style="margin:0 0 .35em 0;">지금이 전투 시즌이 아님은 알 수 있었다. 직감이었다</p>
<p style="margin:0 0 .35em 0;">둘은 한참을 말없이</p>
<p style="margin:0 0 .35em 0;">마을에서 사라지고 사라지면 나타나는 거대 개구리 떼 행렬을</p>
<p style="margin:0 0 .35em 0;">구경했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">거대 개구리로 운송 사업을 하려 했었대요</p>
<p style="margin:0 0 .35em 0;">…</p>
<p style="margin:0 0 .35em 0;">네?</p>
<p style="margin:0 0 .35em 0;">랑은 뜬금없이 뜬금없는 말을 하는 K를 쳐다보았다. 해골 가면은 진지했다</p>
<p style="margin:0 0 .35em 0;">그러다</p>
<p style="margin:0 0 .35em 0;">거대 개구리가 집을 부순 거예요. 시범 운영에서</p>
<p style="margin:0 0 .35em 0;">랑은 그냥 듣고 있었다</p>
<p style="margin:0 0 .35em 0;">그런데</p>
<p style="margin:0 0 .35em 0;">거기 사람이 있었대요. 사람이 다치고. 누군가 분노하고</p>
<p style="margin:0 0 .35em 0;">싸웠대요</p>
<p style="margin:0 0 .35em 0;">분노한 자들과</p>
<p style="margin:0 0 .35em 0;">거대 개구리로 운송 사업을 하려 했던 사업가가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K가 랑을 쳐다봤다</p>
<p style="margin:0 0 .35em 0;">이 마을의 설정이래요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K는 픽 웃더니 가방에서 음료수 두 캔을 꺼냈다. 그중 한 캔을 랑에게 건넸다</p>
<p style="margin:0 0 .35em 0;">랑은 거절하진 않았지만 음료의 뚜껑을 따진 않았다. 들고 있었다. K가 캔을 땄다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">뭔가 이상한 사람이라고 생각했다. 그렇지만 그 이상함에 대한 호기심은</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">왜 살려줬어요?</p>
<p style="margin:0 0 .35em 0;">질문으로 입 밖에 나오게 된다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그건</p>
<p style="margin:0 0 .35em 0;">우리가 만나는 최종 라운드에서 알려드릴게요</p>
<p style="margin:0 0 .35em 0;">저기 위에서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K는 손가락으로 하늘을 가리켰다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">최후의 결전. 천공의 유적지에서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 당연하다는 듯 말하는 K의 자신감과 언행이 싫지 않았다. 오히려 자신과 비슷한 면을 발견한 것 같았다. 아니 비슷하지만 이질적인… 드러내지 못했던 가면의 안과 바깥 그 차이를</p>
<p style="margin:0 0 .35em 0;">둘은</p>
<p style="margin:0 0 .35em 0;">푸른 언덕에서 거대 개구리 떼가 지나가는 것을 보며 아침을 맞이했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 학교 갈 준비를 했다. 이제 끌 거예요</p>
<p style="margin:0 0 .35em 0;">K는 이모티콘으로 안녕을 표현했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">백수인가?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 속으로 생각했지만, 음료수 고맙다고. 손 흔들며 게임을</p>
<p style="margin:0 0 .35em 0;">종료했다. 학교에 갔다. 시간은 지나갔다. 학교를 마칠 때쯤 랑은 &lt;애프터 셀렉트&gt; 커뮤니티를 봤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K에 대한 얘기로 가득했다. 전부 그에게 죽었다는 내용뿐이었다</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 공지에서 해당 내용을 자세히 확인할 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">우선 게임 이용에 불편을 드려 죄송합니다</p>
<p style="margin:0 0 .35em 0;">[천공의 유적지 : 영웅의 시작]은</p>
<p style="margin:0 0 .35em 0;">참가 신청 인원의 절반을 1 Round 통과 기준으로 잡았으나</p>
<p style="margin:0 0 .35em 0;">한 플레이어의 PK로</p>
<p style="margin:0 0 .35em 0;">현 인원이 3명밖에 남지 않았음을 뒤늦게 확인하였습니다</p>
<p style="margin:0 0 .35em 0;">시스템 오류로</p>
<p style="margin:0 0 .35em 0;">확인과 조치 과정에서 미숙한 운영에 사과를 드립니다</p>
<p style="margin:0 0 .35em 0;">운영진은 위와 같은 사항에 대하여</p>
<p style="margin:0 0 .35em 0;">회의 결과</p>
<p style="margin:0 0 .35em 0;">일정 플레이 타임을 가진 현 3명의 인원에 대해선 2 Round 진출을 확정 지으며</p>
<p style="margin:0 0 .35em 0;">확정된 3명의 인원을 제외한…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">공지는 확정된 3명의 인원(랑 포함)을 제외한 1 Round의 재개 소식을 알렸다. 3명을 제외한 리셋 상태로</p>
<p style="margin:0 0 .35em 0;">시스템 점검 이후에</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 길가를 걸으며</p>
<p style="margin:0 0 .35em 0;">클립으로 따진 K의 영상을 봤다. 흙먼지 속에서 끊임없이 총탄 소리가 들리는. 다른 유저의 관점에선 정말 원인도 모르고 죽는</p>
<p style="margin:0 0 .35em 0;">압도적인</p>
<p style="margin:0 0 .35em 0;">무의 상징이 그려지고 있었다. 그의 옆엔 거대 개구리 떼의 죽음이 너무 많이 쌓여있었다. 거대 개구리를 침대 삼아 총을 쏘고 있는 모습이</p>
<p style="margin:0 0 .35em 0;">놀이 같았다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">해골 가면은 웃고 있었다고. 그의 얼굴까진 다가설 수 없어 말할 수 있는 소문이 있었다. 제삼자가 보기엔</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 20,
    title: "20화 2 Round – 진실의 소용돌이",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">긴장감이 감돌았다</p>
<p style="margin:0 0 .35em 0;">대기실은</p>
<p style="margin:0 0 .35em 0;">시선은</p>
<p style="margin:0 0 .35em 0;">1 Round를 우선하여 통과한 3인에 쏟아져</p>
<p style="margin:0 0 .35em 0;">K</p>
<p style="margin:0 0 .35em 0;">토끼탈과 고스트 스토어. 정작 그들은 별생각 없어 보였지만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">잡을 수 있었는데 그치?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">침묵을 깨뜨린 건</p>
<p style="margin:0 0 .35em 0;">1 Round에서 랑을 집단으로 노린 몇몇 유저였다</p>
<p style="margin:0 0 .35em 0;">구석에서</p>
<p style="margin:0 0 .35em 0;">토끼탈을 집요하게 쳐다보며 랑에게 들릴 만큼</p>
<p style="margin:0 0 .35em 0;">자기들끼리 큭큭거려서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 쳐다보자</p>
<p style="margin:0 0 .35em 0;">그들은 반갑다는 듯 손을 흔들었다</p>
<p style="margin:0 0 .35em 0;">랑은 손을 흔들어줬다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">GM이 손목시계를 보며 기다릴 때였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">2 Round</p>
<p style="margin:0 0 .35em 0;">맵의 오픈을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">2 Round는 숲의 수많은 방해물을 피해 진실의 소용돌이에 도착하는 것이었다</p>
<p style="margin:0 0 .35em 0;">숲 곳곳엔 인공 구조물과</p>
<p style="margin:0 0 .35em 0;">소용돌이가</p>
<p style="margin:0 0 .35em 0;">물은 없지만 난류를 형성하는 기이한 그래픽이 곳곳에 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 달렸다</p>
<p style="margin:0 0 .35em 0;">갑자기 풀이 붙잡아서</p>
<p style="margin:0 0 .35em 0;">달리다 넘어졌지만</p>
<p style="margin:0 0 .35em 0;">다시 일어나</p>
<p style="margin:0 0 .35em 0;">달렸다. 소용돌이가 숲 곳곳에</p>
<p style="margin:0 0 .35em 0;">랑은 소용돌이에 발을 대 보았다</p>
<p style="margin:0 0 .35em 0;">공간의 다른 곳으로 워프 됩니다- 메시지가 떴다</p>
<p style="margin:0 0 .35em 0;">선착순으로 500명만을 뽑는</p>
<p style="margin:0 0 .35em 0;">2 Round는 상대를 죽이지 않는 선에서 상대를 방해하여</p>
<p style="margin:0 0 .35em 0;">진실의 소용돌이를 찾아</p>
<p style="margin:0 0 .35em 0;">들어가야 한다</p>
<p style="margin:0 0 .35em 0;">가짜 소용돌이는 워프 장치에 불과하다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">나무의 열매처럼 보이는 것이 떨어지면 폭탄이어서 터질 수도 있다</p>
<p style="margin:0 0 .35em 0;">다람쥐가 귀엽다고 쳐다보면 최면에 걸릴 수도 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">모두가 소용돌이에 발을 댄다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">진실을 찾기 위하여</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">마침</p>
<p style="margin:0 0 .35em 0;">한가로이 꽃구경하던 고스트 스토어</p>
<p style="margin:0 0 .35em 0;">워프 된 랑과 눈이 마주쳤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃이 참 예쁜데</p>
<p style="margin:0 0 .35em 0;">구경 좀 하다 가실래요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 고스트 스토어의 등 뒤로 나오는 유령을 본다</p>
<p style="margin:0 0 .35em 0;">고스트 스토어는 책가방을 메고 있었는데</p>
<p style="margin:0 0 .35em 0;">가방의 지퍼가 열려 있어</p>
<p style="margin:0 0 .35em 0;">유령들이 1초마다 나왔다</p>
<p style="margin:0 0 .35em 0;">귀여운 유령들이 하늘로 솟구치고 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">…아니요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">경쟁 중에 한가로이 꽃을 보며 해맑게 웃고 있는 모습</p>
<p style="margin:0 0 .35em 0;">랑은 사실 네임드</p>
<p style="margin:0 0 .35em 0;">고스트 스토어가 저런 캐릭터인지 몰랐다. 게임이지만</p>
<p style="margin:0 0 .35em 0;">맑은 눈의 광인이 떠올라</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">왜 지금 저러고 있는 거냐고, 속으로 생각할 때</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">후후</p>
<p style="margin:0 0 .35em 0;">단호박이시네요</p>
<p style="margin:0 0 .35em 0;">웃고 있는</p>
<p style="margin:0 0 .35em 0;">고스트 스토어는 가방에서 나오는 유령을 잡아 땅에 심기도 했다</p>
<p style="margin:0 0 .35em 0;">흙으로 잘 덮어서인지</p>
<p style="margin:0 0 .35em 0;">유령이 날아가지 못하고</p>
<p style="margin:0 0 .35em 0;">괴로운 표정으로</p>
<p style="margin:0 0 .35em 0;">어떤 유령은</p>
<p style="margin:0 0 .35em 0;">슬프거나</p>
<p style="margin:0 0 .35em 0;">표정이 없거나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저… 갈게요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">벌써요? 아쉽다</p>
<p style="margin:0 0 .35em 0;">만나서 반가웠어요</p>
<p style="margin:0 0 .35em 0;">다음에 또 볼 수 있겠죠?</p>
<p style="margin:0 0 .35em 0;">그럼</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">안녕!!</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">인사를 건네는 고스트 스토어였다</p>
<p style="margin:0 0 .35em 0;">귀여운 유령들도 함께 손짓을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이상한 사람이었어</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">소용돌이에 발을 댄다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">공간의 다른 곳으로 워프 됩니다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">나뭇가지가 야구의 타자 타격 자세를 취해 하늘로 날아가는 사람</p>
<p style="margin:0 0 .35em 0;">나뭇가지가 갑자기 후드득</p>
<p style="margin:0 0 .35em 0;">떨어져</p>
<p style="margin:0 0 .35em 0;">깔린 사람</p>
<p style="margin:0 0 .35em 0;">다람쥐와 눈 마주쳐 쳐다보다 잠이 든 사람</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">유령이 잡고 날아가</p>
<p style="margin:0 0 .35em 0;">함께</p>
<p style="margin:0 0 .35em 0;">하늘로 날아가 버린 사람들</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 수월하게 진실의 소용돌이에 닿는 동안</p>
<p style="margin:0 0 .35em 0;">귀여운 유령들은 왜 많은 유저를 잡은 채 하늘로 올라가 버렸나</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">루토나 시티의 아침</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">사람들이 일어나는 아침에서</p>
<p style="margin:0 0 .35em 0;">괴롭거나 슬프거나 표정이 없거나</p>
<p style="margin:0 0 .35em 0;">기쁠 수 있다면</p>
<p style="margin:0 0 .35em 0;">감정으로</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">살아가는 모습을</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">본다. 사람들이 걷고 있다. 달리지 않고 있다. 그러니 달리다 넘어지는 일도 없다. 아침이 와서</p>
<p style="margin:0 0 .35em 0;">사람들이 걷고 있는 동안</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 21,
    title: "21화 3 Round – 꽃집 담화",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">히네는 쉬는 시간</p>
<p style="margin:0 0 .35em 0;">자고 있는 랑을 굳이 깨워 하소연했다</p>
<p style="margin:0 0 .35em 0;">아니 남자친구가 있잖아</p>
<p style="margin:0 0 .35em 0;">멍한 상태로 랑은 히네의 싸운 얘기</p>
<p style="margin:0 0 .35em 0;">들어줬다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">어떻게 내가 바퀴벌레가 됐는데 바로 죽인다고 해?</p>
<p style="margin:0 0 .35em 0;">얘기를 들어보니</p>
<p style="margin:0 0 .35em 0;">요즘 유행하는</p>
<p style="margin:0 0 .35em 0;">바퀴벌레 테스트(내가 바퀴벌레가 된다면 너 어떻게 할 거야)를 남자친구에게 물어본 모양이었다</p>
<p style="margin:0 0 .35em 0;">랑은 피곤했다</p>
<p style="margin:0 0 .35em 0;">나빴네, 나빴다. 반응해주고 자고 싶었다. 히네는</p>
<p style="margin:0 0 .35em 0;">얘기를 제대로 듣는 건지 안 듣는 건지</p>
<p style="margin:0 0 .35em 0;">피곤해하는 랑을 보며</p>
<p style="margin:0 0 .35em 0;">반응이 왜 그래? 난 진지하게 물어보고 있는 건데</p>
<p style="margin:0 0 .35em 0;">화내는 동시에</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">시간이 사과에 빚을 졌다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">미안</p>
<p style="margin:0 0 .35em 0;">요즘 계속 밤을 새우다 보니 피곤했나 봐</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">쉬는 시간을 다 써 랑은 히네에게 용서를 구했다. 종이 치고 자기 반으로 돌아가는</p>
<p style="margin:0 0 .35em 0;">히네의 뒷모습에서</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">현실에 조금 지쳤다</p>
<p style="margin:0 0 .35em 0;">피곤해…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">[천공의 유적지 : 영웅의 시작]이 시작된 이후로 랑은 제대로 잠에</p>
<p style="margin:0 0 .35em 0;">들지 못했다</p>
<p style="margin:0 0 .35em 0;">랑은 햇살이 가득 담긴 차창 밖 체육 수업을 준비하는 다른 반 애들을 오해하지 않았다</p>
<p style="margin:0 0 .35em 0;">선생님이 나오기 전까지 자기들끼리 떠들고 있는 모습이</p>
<p style="margin:0 0 .35em 0;">즐겁다면</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 생각한다. 관계는 왜 내게 해를 끼칠까</p>
<p style="margin:0 0 .35em 0;">왜 너는 굳이 쉬는 시간에 자고 있는 나를 깨운 걸까</p>
<p style="margin:0 0 .35em 0;">너는 친구일까</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">수업 시간 내내 깊은 잠에 들었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">표정이 왜 그래? 좀 웃어요. 예쁘게 생겨선</p>
<p style="margin:0 0 .35em 0;">손님이 햄버거 세트를 가져가며 말했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">점장이</p>
<p style="margin:0 0 .35em 0;">오늘 무슨 일 있어요? 도와줄 수 있는 거라면 도와줄 수 있는데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">퇴근 버스에서</p>
<p style="margin:0 0 .35em 0;">라디오</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">현자의 다음 행보에 대해, 말씀에 대해, 창궐한 병에 대해</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">노인들은 배낭을 메고 랑 포함 사람들을 열심히 밀치며 자기 갈 길 갔다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">눈에 띄고 싶지도 갈구하고 있지도 않잖아. 가만히 눈을 감은 것인데. 자는 척인데</p>
<p style="margin:0 0 .35em 0;">왜 자꾸 칼로 눈꺼풀을 위로 들어 올려</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">잠깐</p>
<p style="margin:0 0 .35em 0;">생각했다가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">집에 도착하자마자 침대에 누웠다. 집에 오니 이상하게 정신이 멀쩡해짐을 느꼈다</p>
<p style="margin:0 0 .35em 0;">결국</p>
<p style="margin:0 0 .35em 0;">오늘도 컴퓨터 책상 앞</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 로딩 화면을 본다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">친구도</p>
<p style="margin:0 0 .35em 0;">길드도</p>
<p style="margin:0 0 .35em 0;">들어와도</p>
<p style="margin:0 0 .35em 0;">아무런 인사</p>
<p style="margin:0 0 .35em 0;">없는 공간에서</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">안락함을 느꼈다</p>
<p style="margin:0 0 .35em 0;">근처에 어슬렁거리는</p>
<p style="margin:0 0 .35em 0;">눈사람 몬스터를</p>
<p style="margin:0 0 .35em 0;">일격으로 죽였다</p>
<p style="margin:0 0 .35em 0;">눈사람 몬스터는 죽으며</p>
<p style="margin:0 0 .35em 0;">녹았다</p>
<p style="margin:0 0 .35em 0;">녹아</p>
<p style="margin:0 0 .35em 0;">고인 물이 되어</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">고인 물을</p>
<p style="margin:0 0 .35em 0;">쳐다봤다</p>
<p style="margin:0 0 .35em 0;">토끼탈이 보였다. 토끼탈은 왜</p>
<p style="margin:0 0 .35em 0;">토끼탈</p>
<p style="margin:0 0 .35em 0;">랑이 영혼에 심혈을 기울일 때</p>
<p style="margin:0 0 .35em 0;">물은 비치는 성질로</p>
<p style="margin:0 0 .35em 0;">이 공간의 현실감</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">눈이 내리는 중</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">눈을 좀 맞다가</p>
<p style="margin:0 0 .35em 0;">3 Round 전용 맵으로 이동하기 위해 호루라기를 불렀다. 거대한 새가 눈을 뚫고 날아와</p>
<p style="margin:0 0 .35em 0;">500개의 꽃집이 있는 마을에 도착했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">선별 과정의 마지막은 500명 중에서 단 2명만을 뽑는 것</p>
<p style="margin:0 0 .35em 0;">각자 자기의 꽃집을 찾아 들어가야 했다</p>
<p style="margin:0 0 .35em 0;">다른 유저들의 살생과 방해에 맞서</p>
<p style="margin:0 0 .35em 0;">꽃집에 들어가</p>
<p style="margin:0 0 .35em 0;">꽃집 주인 NPC와 대화의 끝을</p>
<p style="margin:0 0 .35em 0;">봐야 하는</p>
<p style="margin:0 0 .35em 0;">(꽃집 주인 NPC와 대화 도중이더라도 다른 유저는 창문을 통해 이를 확인할 수 있으며 침투 또한 가능하다)</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">항상 이 시간에 들어오더라고?</p>
<p style="margin:0 0 .35em 0;">1 Round에서부터 지속적으로 괴롭히던 집단의 인원 몇몇이</p>
<p style="margin:0 0 .35em 0;">랑이</p>
<p style="margin:0 0 .35em 0;">모습을 드러낸</p>
<p style="margin:0 0 .35em 0;">꽃집 앞에서</p>
<p style="margin:0 0 .35em 0;">큭큭</p>
<p style="margin:0 0 .35em 0;">웃었다</p>
<p style="margin:0 0 .35em 0;">그들은 랑은 기다리고 있던 것이다. 그들은 손을 들며 인사했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그들의 손이 잘렸다</p>
<p style="margin:0 0 .35em 0;">토끼탈에</p>
<p style="margin:0 0 .35em 0;">피가 잔뜩 튀었다. 난도질이</p>
<p style="margin:0 0 .35em 0;">4명의 시체를</p>
<p style="margin:0 0 .35em 0;">만들었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">바로 죽였어야지</p>
<p style="margin:0 0 .35em 0;">알았으면</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃집 앞에는 피 웅덩이가</p>
<p style="margin:0 0 .35em 0;">그곳엔 토끼탈이</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이</p>
<p style="margin:0 0 .35em 0;">꽃집 문을 열었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃집 주인은 플라워박스를 만들고 있었다. 꽃집 주인은 랑을 조금 쳐다보다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">호흡</p>
<p style="margin:0 0 .35em 0;">언어 입력 시간에 따라</p>
<p style="margin:0 0 .35em 0;">이모티콘에 따라</p>
<p style="margin:0 0 .35em 0;">진심인지</p>
<p style="margin:0 0 .35em 0;">진심은 아닌 일이겠지만</p>
<p style="margin:0 0 .35em 0;">꽃집 주인과 만나면 정말로 현실과 마주하는 기분이고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">피가 좀 많이 묻으셨어요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">걱정된다는 듯 말하는 나긋한 톤에</p>
<p style="margin:0 0 .35em 0;">랑의 마음이 뭉그러졌다. 고작 그래픽인데 왜 하루의 위안인지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">한마디가 대화였다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 22,
    title: "22화 3 Round – 꽃집 담화 2",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">꽃집 주인 NPC는 토끼탈에 묻은 피를 닦아주었다</p>
<p style="margin:0 0 .35em 0;">손수건이 닿자 토끼탈이 깨끗해졌다</p>
<p style="margin:0 0 .35em 0;">꽃집 주인 NPC는 피를 다 닦고서 차와 다과를 내왔다</p>
<p style="margin:0 0 .35em 0;">꽃집의 꽃들 사이에서</p>
<p style="margin:0 0 .35em 0;">따뜻한 차. 캐모마일</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">둘은 앉은키의 시선이 된다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">오시느라 고생 많으셨어요. 참, 제 소개가 늦었지요. 제 이름은 크루슈라고 해요</p>
<p style="margin:0 0 .35em 0;">용사님은 이름이 어떻게 되시나요?</p>
<p style="margin:0 0 .35em 0;">크루슈는 이것저것 날씨가 꽤 더워졌다는 얘기나 여행은 좋아하는지</p>
<p style="margin:0 0 .35em 0;">과자가 금세 다 떨어졌다며 다과를 가지러 자리에서 일어나기도 했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그래서 어떻게 되셨어요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 크루슈에게 지금껏 있었던 추격전 얘기를 들려주고 있었다</p>
<p style="margin:0 0 .35em 0;">2시간 동안이나 NPC와 대화를 나누며 이게 지금 뭘까, 생각이 드는 랑이었지만</p>
<p style="margin:0 0 .35em 0;">이상하게도 꽃의 향기가 느껴지는 듯했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃집은 아늑히</p>
<p style="margin:0 0 .35em 0;">가게가 아니라 거주하는 집처럼 살고 있는 집에 꽃만 가득한 것처럼</p>
<p style="margin:0 0 .35em 0;">실내장식</p>
<p style="margin:0 0 .35em 0;">커튼</p>
<p style="margin:0 0 .35em 0;">랑이</p>
<p style="margin:0 0 .35em 0;">꽃집을</p>
<p style="margin:0 0 .35em 0;">왠지 간결한 위로라고 느끼며 둘러보는 와중에</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">눈이 마주쳤다</p>
<p style="margin:0 0 .35em 0;">창문 밖에서 누가 쳐다보고 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃집 문이 열렸다</p>
<p style="margin:0 0 .35em 0;">아하하, 또 만났어요!!</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">자연스럽게 문을 열고 들어온 자는 고스트 스토어였다</p>
<p style="margin:0 0 .35em 0;">랑은 어이가 없었지만 이 새벽의 알 수 없는 대화와 학교의 일들 아르바이트의 피로함이</p>
<p style="margin:0 0 .35em 0;">급작스럽게 뭉쳐</p>
<p style="margin:0 0 .35em 0;">장면은 흘러간다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">셋은 얘기 나누게 된다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저는 요즘 에밀 아자르의『가면의 생』을 읽고 있어요</p>
<p style="margin:0 0 .35em 0;">로맹 가리는 왜 에밀 아자르라는 이름으로 글을 써야만 했을까</p>
<p style="margin:0 0 .35em 0;">그 마음을 생각하는 요즘이랍니다</p>
<p style="margin:0 0 .35em 0;">고스트 스토어는 자신의 문학적 소양을 자연스럽게 화두에 던져놓는다</p>
<p style="margin:0 0 .35em 0;">고스트 스토어의 책가방에서 나오는 유령들이 고개를 끄덕거리며 공감한다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">가면의 생이란 왠지 눈물이 나거든요</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">왠지</p>
<p style="margin:0 0 .35em 0;">저 말을 하며 자신을 쳐다보는 듯한 고스트 스토어의 눈빛이</p>
<p style="margin:0 0 .35em 0;">토끼탈 안에 있는 자신의 내부를 쳐다보는 것처럼</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">고스트 스토어는 이어 말했다. 로맹 가리는 라디오 방송에 출연해 자신의 삶을 말했어요</p>
<p style="margin:0 0 .35em 0;">난 내가 삶을 산 거라는 확신이 서지 않습니다</p>
<p style="margin:0 0 .35em 0;">나는 삶을 살아가기보다는 내 삶에 의해 살아졌다는 느낌이 듭니다</p>
<p style="margin:0 0 .35em 0;">내가 삶을 선택했다기보다는 삶의 대상이 되었다는 느낌입니다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">고스트 스토어가 말을 아끼지 않고 이어나갔다. 자신으로 살아가고 있나요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">고스트 스토어는 저기 밖에 괜찮은 공원이 있다고 같이 나가자고</p>
<p style="margin:0 0 .35em 0;">꽃집을 나와 그네도 타고</p>
<p style="margin:0 0 .35em 0;">셋이서 걷고</p>
<p style="margin:0 0 .35em 0;">얘기 나누고</p>
<p style="margin:0 0 .35em 0;">그러다 마을을 당연히 바라보게 되는데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃집이 참 많네요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">크루슈가 말했다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },

  {
    id: 23,
    title: "23화 3 Round – 꽃집 담화 3",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">크루슈가 마을의 많은 꽃집 보고 자신은 무엇일까 생각해야 했을 때</p>
<p style="margin:0 0 .35em 0;">이토록 꽃이 많은 동네</p>
<p style="margin:0 0 .35em 0;">세포가 뜨거워짐을</p>
<p style="margin:0 0 .35em 0;">단순히 감정 문제로 단념해야 했을 때</p>
<p style="margin:0 0 .35em 0;">셋은 나란히 손잡고 산책하고 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">크루슈는 양쪽의 마주 잡은 손</p>
<p style="margin:0 0 .35em 0;">진심을 흘린다</p>
<p style="margin:0 0 .35em 0;">조금 땀이 나네요. 더운 여름이 아니라</p>
<p style="margin:0 0 .35em 0;">손이 아니라면 걷기 힘들었을지도 몰랐을 테니까</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">셋은 사진을 찍었다</p>
<p style="margin:0 0 .35em 0;">고스트 스토어의 핸드폰으로</p>
<p style="margin:0 0 .35em 0;">셀카 모드</p>
<p style="margin:0 0 .35em 0;">팔을 쭉 뻗어서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">바람이 찍혀 머리카락이 흩날리는 걸 볼 수 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">크루슈! 너무 잘 나왔어요. 정말. 정말. 이따 사진 보내드릴게요. 우리 친구 추가해요. 고스트 스토어는 들떴는지 핸드폰을 건네며 연락처 교환을 원했다</p>
<p style="margin:0 0 .35em 0;">크루슈는 번호를 찍어주며,</p>
<p style="margin:0 0 .35em 0;">오늘은 슬프지만, 분명 기쁠 거예요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">헤어짐은 멀지 않으니까</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">띠링-</p>
<p style="margin:0 0 .35em 0;">크루슈의 핸드폰 알림 소리가 공기 중에서 울렸다. 고스트 스토어로부터 온 메시지였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">우리는 친구니까</p>
<p style="margin:0 0 .35em 0;">곧 볼 수 있을 거예요 :)</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">크루슈는 자신에게 친구란 머나먼 섬이라 생각했다. 뭔지는 알겠는데, 갈 수 있을지는 확신이 안 드는</p>
<p style="margin:0 0 .35em 0;">멀다는 거리감</p>
<p style="margin:0 0 .35em 0;">이해할 수 있던</p>
<p style="margin:0 0 .35em 0;">크루슈는 고스트 스토어와 눈이 마주친다. 가까이에 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑도 얼떨결에</p>
<p style="margin:0 0 .35em 0;">고스트 스토어와 연락처 교환을 마치고 이제 헤어질 시간</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저는… 두 분 모두 좋아서요. 모두 통과를 드리고 싶은데</p>
<p style="margin:0 0 .35em 0;">이 메시지가 안 보이실 테지만, 안 된다고 해요. 어떻게 하는 게 좋을지…</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">국룰은 가위바위보니까요. 이걸로 정하는 게 어떨까요?</p>
<p style="margin:0 0 .35em 0;">고스트 스토어가 랑에게 말했다</p>
<p style="margin:0 0 .35em 0;">랑의 말은 듣지도 않고 어깨를 빙빙 돌리며 몸을 풀고 있는 모습이었다</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">별 상관없었다</p>
<p style="margin:0 0 .35em 0;">여기서 떨어져도 오히려</p>
<p style="margin:0 0 .35em 0;">좋을지도 모르겠다고</p>
<p style="margin:0 0 .35em 0;">그런 생각이 들기도</p>
<p style="margin:0 0 .35em 0;">왜. 피로 때문은 아닌 듯한</p>
<p style="margin:0 0 .35em 0;">지끈거림이 머리를 순찰하며 돌아다녀</p>
<p style="margin:0 0 .35em 0;">왠지 몸까지 뜨거워지고 몽롱해지는</p>
<p style="margin:0 0 .35em 0;">밖에 나온 뒤부터</p>
<p style="margin:0 0 .35em 0;">그런 느낌이 들었으므로</p>
<p style="margin:0 0 .35em 0;">상금이 있으면 좋지만, 명예가 따라오면 물론 좋지만, 최강자란 말은 기분이 너무 좋지만</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">저는 가위를 낼 거예요. 고스트 스토어가 말했지만</p>
<p style="margin:0 0 .35em 0;">야릇한 기분 덕에 심리전이 통하지 않았다. 주먹을 낸 랑</p>
<p style="margin:0 0 .35em 0;">가위를 낸</p>
<p style="margin:0 0 .35em 0;">고스트 스토어</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">고스트 스토어 패배</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이길 줄 알았는데! 아쉽다. 그래도 좋은 승부였다…</p>
<p style="margin:0 0 .35em 0;">배시시 웃는 고스트 스토어를 앞에 두고 랑은 최종 라운드에 진출한다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">시스템에서 '크루슈의 징표를 획득했다!' 메시지가 떴다</p>
<p style="margin:0 0 .35em 0;">고스트 스토어는 꼭 결승에서 보고 싶단 말을 랑에게 끝으로, 바이 바이</p>
<p style="margin:0 0 .35em 0;">떠났다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">이토록 꽃이 많은 동네. 꽃집이 많은 동네</p>
<p style="margin:0 0 .35em 0;">몸이 뜨거워지고 몽롱해지는 느낌을 두 사람이 동시에 느꼈다</p>
<p style="margin:0 0 .35em 0;">오늘. 고마웠어요</p>
<p style="margin:0 0 .35em 0;">크루슈가 말했고</p>
<p style="margin:0 0 .35em 0;">저야말로 감사해요</p>
<p style="margin:0 0 .35em 0;">랑이 답했다</p>
<p style="margin:0 0 .35em 0;">랑은 왜 이 일이 처음이 아닌 것 같은지, 어디선가 왜 본 것 같은지, 일어났던 일 같은지</p>
<p style="margin:0 0 .35em 0;">알 수 없었다</p>
<p style="margin:0 0 .35em 0;">그럼 가보겠습니다. 랑이 어쨌든 인사할 때</p>
<p style="margin:0 0 .35em 0;">망설이는 크루슈가</p>
<p style="margin:0 0 .35em 0;">저,</p>
<p style="margin:0 0 .35em 0;">혹시 저희는 어디선가 만난 적이 있었나요?</p>
<p style="margin:0 0 .35em 0;">어지럼증을 계속해서 느낀 랑이</p>
<p style="margin:0 0 .35em 0;">했던 말</p>
<p style="margin:0 0 .35em 0;">왜 그런 말이 나왔는지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">당신은 진짜가 아니잖아요</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },

  {
    id: 24,
    title: "24화 천공의 유적지 : 영웅의 시작",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">크루슈의 동공이 탁해지며 뒤돌아섰다. 그대로 자신의 꽃집이 아닌</p>
<p style="margin:0 0 .35em 0;">숲속으로 들어가는 모습을 랑은 오랫동안 생각했다</p>
<p style="margin:0 0 .35em 0;">불러 세우지 못했다</p>
<p style="margin:0 0 .35em 0;">당시 입은 꽃을 피우기에 적합한 기관이 아니어서</p>
<p style="margin:0 0 .35em 0;">왜 그랬지? 랑은 이해할 수 없는 그 날의 모습에</p>
<p style="margin:0 0 .35em 0;">죄책감을 붙여뒀었다</p>
<p style="margin:0 0 .35em 0;">스티커처럼</p>
<p style="margin:0 0 .35em 0;">기억이 허가한 죄처럼</p>
<p style="margin:0 0 .35em 0;">게임에 접속할 때마다</p>
<p style="margin:0 0 .35em 0;">크루슈에게</p>
<p style="margin:0 0 .35em 0;">연락했다. 대답은 오지 않았다. 연락처에만 남아 있는 이름이 되어버렸다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 이 일이 자신의 일상에 궤도와 같이 오르는 것을 느끼고 있었다</p>
<p style="margin:0 0 .35em 0;">눈에 영 힘이 빠진 채로</p>
<p style="margin:0 0 .35em 0;">복도에서</p>
<p style="margin:0 0 .35em 0;">누군가와 어깨 부딪쳤을 때</p>
<p style="margin:0 0 .35em 0;">사과하지 않았다. 기분을 축내지 않았다</p>
<p style="margin:0 0 .35em 0;">자신을 보며 수군거리는 시선을 느끼고 있었다. 히네가 쉬는 시간</p>
<p style="margin:0 0 .35em 0;">랑을 더는 찾아오지 않을 무렵</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑에겐 최종전이 남아 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">중대한 문제는 그것뿐인 것처럼. 이 일이 다 지나간다면 뭐가 달라질 수 있나? 묻고 싶은 것처럼</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">대기실의 문이 열리기만을 기다리고 있었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">축구 경기를 직관한다 생각하면 이 이미지를 떠올리는 일이 수월할 것이다</p>
<p style="margin:0 0 .35em 0;">그들은 빈 콜로세움 경기장을 지금은 주목하지 않고 수다를 떨고 있었다</p>
<p style="margin:0 0 .35em 0;">경기를 기다리는 관객들은</p>
<p style="margin:0 0 .35em 0;">모두 천공의 유적지 관중석에 앉아</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">한쪽의 문에선</p>
<p style="margin:0 0 .35em 0;">랑이</p>
<p style="margin:0 0 .35em 0;">다른 한쪽의 문에선</p>
<p style="margin:0 0 .35em 0;">K가</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">중앙의 콜로세움 경기장을 향해 걸어오고 있었다</p>
<p style="margin:0 0 .35em 0;">둘은 마주쳤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">해골 가면의 권총</p>
<p style="margin:0 0 .35em 0;">K</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">토끼탈</p>
<p style="margin:0 0 .35em 0;">당근 모형의 칼</p>
<p style="margin:0 0 .35em 0;">랑</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K는 기다렸었다. 당근을 든 토끼탈과 마주하는 순간을</p>
<p style="margin:0 0 .35em 0;">꿈과 한 치의 오차도 없는 이 장면을</p>
<p style="margin:0 0 .35em 0;">해답을 얻을 수 있을 거라 생각했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑은 기다렸었다. 이해할 수 없는 감각이 다시 자신을 붙잡기를</p>
<p style="margin:0 0 .35em 0;">열감이 자신을 덮어 그 무엇도 연관 없어지는 이 장면을</p>
<p style="margin:0 0 .35em 0;">해답을 얻을 수 있을 거라 생각했다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">서로에게 겨누는 타점은 분명 달랐다</p>
<p style="margin:0 0 .35em 0;">운명이 겨우 한 움큼 섞인 것이다</p>
<p style="margin:0 0 .35em 0;">그들이 아주 오래전</p>
<p style="margin:0 0 .35em 0;">싸웠던 전장</p>
<p style="margin:0 0 .35em 0;">서로 죽이지 못했던 그 장소에서</p>
<p style="margin:0 0 .35em 0;">마주 봐서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">달라진 것이 없었다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 25,
    title: "25화 천공의 유적지 : 영웅의 시작 2",
    content: `<div style="font-family:Pretendard,'Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple SD Gothic Neo','Noto Sans','Malgun Gothic',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;"><p style="margin:0 0 .35em 0;">관중들이 환호했다 관중들이 숨죽였다 관중들이</p>
<p style="margin:0 0 .35em 0;">부추겼다</p>
<p style="margin:0 0 .35em 0;">K가 혼이라도 나간 듯 가만있어서 범위 안으로</p>
<p style="margin:0 0 .35em 0;">랑이 쉽사리 파고들 수 없었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">단순히 데자뷰라 판단할 수 없는 장면들을 K가 보고 있어서였다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">세상에서 본 적 없는 거대 개구리와 소용돌이</p>
<p style="margin:0 0 .35em 0;">…크루슈가</p>
<p style="margin:0 0 .35em 0;">관중들이</p>
<p style="margin:0 0 .35em 0;">그들이 부추기는 모습이</p>
<p style="margin:0 0 .35em 0;">경기장</p>
<p style="margin:0 0 .35em 0;">정면에서 자신을 바라보고 있는 자가</p>
<p style="margin:0 0 .35em 0;">스쳐 감에</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">덕분에 덩달아 랑도 머뭇거리게 됐다. 멍하니 멈춰 있는 K를 보고 있는데</p>
<p style="margin:0 0 .35em 0;">지저귀는 새의 울음소리가 들리는 것이었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">처음엔</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">도륙해버리면 되는 거야, 명命하는</p>
<p style="margin:0 0 .35em 0;">열감이 자작자작 타오르는 장작의 소리인 줄 알았다가</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">자신을 부르는 구슬픈 소리임을 불철주야의 외로움임을 불길의 검은 연기로부터 달아나는 새가</p>
<p style="margin:0 0 .35em 0;">활주로로 급히 정신을 우회 이용한 것이었을 때(이때 날아가다 한 가닥 떨어지던 이성의 깃털)</p>
<p style="margin:0 0 .35em 0;">정복 실패</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">둘이 각자의 사정으로 움직이지 못하였을 때. 그렇기에 K가 꿈의 장면을 충분히 바라봤을 때</p>
<p style="margin:0 0 .35em 0;">뜻밖의 장면이 연출되었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K가</p>
<p style="margin:0 0 .35em 0;">먼저 발을 뗀 것이다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">전진한 것이다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">신속에 가까운 돌진</p>
<p style="margin:0 0 .35em 0;">오직 단 한 명에게로 가는 여정. 토끼탈에게</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">권총과 당근의 부딪침</p>
<p style="margin:0 0 .35em 0;">굉음이</p>
<p style="margin:0 0 .35em 0;">두 힘이 섞였을 때의 진동이 관중석으로 넘어가 관중들의 머리가 흩날렸다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">단 한 합의 공방으로 모든 관중이 조용해졌다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">접근전이었다</p>
<p style="margin:0 0 .35em 0;">누구도 예상치 못한 파괴적인 싸움이 시작되었다</p>
<p style="margin:0 0 .35em 0;">합이 진행될수록</p>
<p style="margin:0 0 .35em 0;">경기장에 균열이 나기 시작했다</p>
<p style="margin:0 0 .35em 0;">두 힘의 거대한 파동에 관중석에서 도망가는 사람들도 생겼다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑이 웃고 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">좀 전의 께름칙한 마음 대 마음이 아닌</p>
<p style="margin:0 0 .35em 0;">오로지 살육을 향한 당근의 궤적이었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">부딪힘과 부딪침</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">결승전 보이스챗 모드가 켜진 상태에서</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">루토나 시티</p>
<p style="margin:0 0 .35em 0;">아파트 공간 협소한 자기 집에서</p>
<p style="margin:0 0 .35em 0;">계속 혼잣말했다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">광기에서 광기로</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑의 맹공에</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K가 보이스챗으로 다 듣고 있었을 때</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K는 기억이 자신을 쫓는 장면에 괴로웠다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">몇 그램의 슬픔이 찾아왔다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">지금껏 단 한 번의 총성도 울리지 않던 천공의 유적지에서</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K는</p>
<p style="margin:0 0 .35em 0;">공방의 찰나</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">상대의 머리에</p>
<p style="margin:0 0 .35em 0;">총알을 박아넣었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">토끼탈의 머리카 터져 피가 쏟아졌다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">죽어…</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">현실인 듯, 랑은</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">자신이 쓰러져 위에서 내려다보는 해골 가면을 쳐다본다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">태양이 위에 떠 있어 빛이 강렬했다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그런 오후였다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">영웅의 탄생을 알립니다! GM의 부르짖는 마이크 소리와 함께</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑의 화면이 꺼졌다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">어둠이었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K는 랑의 목소리를 두 번 다시 떠올리고 싶지 않았다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">단 한 번의 총성으로</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">K가 지금 통과해내는 감정은</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">당신이 이제 꿈에 찾아오지 않았으면 해요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">내가 당신의 목소리를 괴로운 것으로</p>
<p style="margin:0 0 .35em 0;">생각할 수 있어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">다행입니다</p></div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 26,
    title: "26화 다시 만남",
    content: `<div style="font-family:Pretendard, 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple SD Gothic Neo', 'Noto Sans', 'Malgun Gothic', sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;">
<p style="margin:0 0 .35em 0;">복도엔 꽃을 한가득 든 학생들이 많았다</p>
<p style="margin:0 0 .35em 0;">플라워데이</p>
<p style="margin:0 0 .35em 0;">한 달에 한 번 꽃을 전해주는 날이었다</p>
<p style="margin:0 0 .35em 0;">랑은 엎드려서 힐끔</p>
<p style="margin:0 0 .35em 0;">서로 주고받는 관계의 얼굴을 본다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">꽃의 둥지 혹은</p>
<p style="margin:0 0 .35em 0;">성지라 불리는 코르타 지역의 꽃들은 유독 이날 향기가 더 짙다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">상징인 것이다</p>
<p style="margin:0 0 .35em 0;">흰 머리 노인이 눈을 감고 한 소년의 머리에 자기 손을 얹은 것으로</p>
<p style="margin:0 0 .35em 0;">돌이 되는 것을</p>
<p style="margin:0 0 .35em 0;">막았다는 이유로</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">월계화가 유명하다고 하죠</p>
<p style="margin:0 0 .35em 0;">리포터가 꽃의 둥지에서 분홍, 빨강, 노랑, 흰색의 층을 이루는 월계화의 계단을</p>
<p style="margin:0 0 .35em 0;">카메라를 통해 보여주며 사람들을 인터뷰하는 모습을 랑은 본 적 있다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">현자의 탄생을 기리며</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">월계화는 특히 마음에 좋은 성분이 깃든다고 해요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">고마워</p>
<p style="margin:0 0 .35em 0;">너무 예쁘다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">교실에선 커플이 탄생했다. 한 달에 한 번 고백하기에도 좋은</p>
<p style="margin:0 0 .35em 0;">여자애는 꽃에 얼굴을 파묻었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑 근처엔 누구도 오지 않았다. 이 익숙함을 랑은 안다</p>
<p style="margin:0 0 .35em 0;">K 생각이 났다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">결승전이 끝나고</p>
<p style="margin:0 0 .35em 0;">만나자던 밤의 길거리에서</p>
<p style="margin:0 0 .35em 0;">둘은 벤치에 앉아 음료수를 따</p>
<p style="margin:0 0 .35em 0;">짠</p>
<p style="margin:0 0 .35em 0;">캔끼리 부딪치는 소리가 나며</p>
<p style="margin:0 0 .35em 0;">왜 그때 살려준 것인지</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">지금은 좀 어때요?</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">조금, 지쳤</p>
<p style="margin:0 0 .35em 0;">랑은 타자를 치다 백스페이스를 누르고</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">지금은 괜찮아요</p>
<p style="margin:0 0 .35em 0;">둘은 어색한 침묵을 공유했다. 이럴 땐 스몰토크가 좋은데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">음료수… 맛있네요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">랑이 K를 쳐다봤다</p>
<p style="margin:0 0 .35em 0;">K도 랑을 쳐다봤다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">K가 랑을 벤치에서 밀쳤다. 총알이 날아와서였다</p>
<p style="margin:0 0 .35em 0;">경찰이에요. 우리는 뛰어야 해요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">밤의 길거리에서 둘은 어둠을 넘고 넘어</p>
<p style="margin:0 0 .35em 0;">드문드문</p>
<p style="margin:0 0 .35em 0;">시티 라이트가 닿는</p>
<p style="margin:0 0 .35em 0;">폐건물 꼭대기에서</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">난 당신이 괴로워서 잊을 수 없어요</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">-</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">오랜 꿈에서부터 내가 나왔다니, 랑은 책상에 엎드려 알 수 없는 기분에 잠긴다</p>
<p style="margin:0 0 .35em 0;">햇빛이 세다</p>
<p style="margin:0 0 .35em 0;">머리가 띵한 기분이 들었다</p>
<p style="margin:0 0 .35em 0;">날달걀이 터진 것이었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">헐. 미안</p>
<p style="margin:0 0 .35em 0;">맞힐 생각 없었는데 맞았네? 어떡해</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">처음 보는 애가</p>
<p style="margin:0 0 .35em 0;">랑의 머리에 날달걀을 던진 것이었는데</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">그래도… 조금 익숙하지?</p>
<p style="margin:0 0 .35em 0;">같은 반 애들이 킥킥 웃었다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">처음 보는 애가 날달걀을 맞히고 생글생글 웃는 모습에 랑은</p>
<p style="margin:0 0 .35em 0;">그 애에게 다가가</p>
<p style="margin:0 0 .35em 0;">뺨을 때렸다</p>
<p style="margin:0 0 .35em 0;">교실이 아수라장이 됐다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">1교시는 마음 단련 시간</p>
<p style="margin:0 0 .35em 0;">바르게 살아요</p>
<p style="margin:0 0 .35em 0;">바르게 살아요 우리</p>
<p style="margin:0 0 .35em 0;">학생들은 눈 감는다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">달걀 냄새가 아직 완전히 걷히지 않은, 창문에서 바람이 다가오지 않는 날에</p>
<p style="margin:0 0 .35em 0;">랑은 K를 떠올렸다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">아르바이트를 위해 걸음을 옮기는 날이었다</p>
<p style="margin:0 0 .35em 0;">어물쩍거리는 우울감이 자기소개를 제대로 안 한 날이었다</p>
<p style="margin:0 0 .35em 0;">햇빛이 센 날이었다</p>
<p style="margin:0 0 .35em 0;">따갑다,</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">태양을 바라보는데</p>
<p style="margin:0 0 .35em 0;">검은 그림자가 자신을 향해 날아오던 날이었다</p>
<p style="margin:0 0 .35em 0;">굉음이 귓속을 잠시</p>
<p style="margin:0 0 .35em 0;">왔다 간 날이었다</p>
<p style="margin:0 0 .35em 0;">충격파로 주변 건물이</p>
<p style="margin:0 0 .35em 0;">모두 무너진 날이었다</p>
<p style="margin:0 0 .35em 0;">랑만이 공간에서 아무 영향 없이 단지 놀라 멈춰 있던 것이었을 때</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">괴물이었다</p>
<p style="margin:0 0 .35em 0;">랑이 옛날 고목에서 떨어졌을 때</p>
<p style="margin:0 0 .35em 0;">마주쳤던 기억이 있는, 붉은 초승달 형태의 상처가 안면에 있는</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">경보음이 시끄럽게 울렸다. 1급 위험 경보였다</p>
<div style="height:1.3em;"></div>
<p style="margin:0 0 .35em 0;">괴물이 뭐라 뭐라 짧게 말하며</p>
<p style="margin:0 0 .35em 0;">랑에게 다가왔다. 손을 뻗었다. 경보음이 울리고 있었다. 랑은 아무것도 할 수 없었다. 괴물은 랑의 머리칼에 자그맣게 붙어 있는 달걀 껍데기를 떼어주었다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 27,
    title: "27화 랑은 세계의 일원으로 존재하는 방식을 나무와 숲에 빗대어 봄",
    content: `<div style="font-family:Pretendard,'Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple SD Gothic Neo','Noto Sans','Malgun Gothic',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;">
<p style="margin:0 0 .35em 0;">랑은 1급 위험 경보 사이렌 속에 혼자 있었다</p>
<p style="margin:0 0 .35em 0;">괴물이 날아간 뒤에도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">정신 좀 차려보라고, 군인처럼 보이는 이가 랑의 몸을 흔들었을 때 랑은 흔들리던 글자를 기억한다. ROM</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">이 건물의 사람들은 팔뚝에 ROM이라 적힌 군복(?)을 입고 있었다. 랑은 이들의 복장을 군복처럼 느꼈으나 아닐지도 모르겠다고, 아니어도 무슨 상관일까 싶은 랑이</p>
<p style="margin:0 0 .35em 0;">여긴 어디</p>
<p style="margin:0 0 .35em 0;">둘러봤을 때</p>
<p style="margin:0 0 .35em 0;">채도가 낮은 민트색 인테리어의 처연함을 보았다. 랑의 눈앞엔 짙은 노란색 스포츠머리를 한</p>
<p style="margin:0 0 .35em 0;">딱 봐도 단련을 엄청나게 했을 듯한 중년 남성이 서류를 보고 있었다. 인기척을 느낀 중년 남성이 랑을 쳐다보며,</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">자네… 3대 몇 치나?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">3대 몇 치냐는 질문은 또 참신했으므로 랑은 살짝 어이가 없었다. 3대요?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">중년 남성은 핫, 웃으며</p>
<p style="margin:0 0 .35em 0;">뭐, 장난이네만</p>
<p style="margin:0 0 .35em 0;">아무래도 여기가 친숙할 것 같진 않아서 말이지. 아이스 브레이킹을 해봤다네</p>
<p style="margin:0 0 .35em 0;">중년 남성은 목을 큼큼 풀며,</p>
<p style="margin:0 0 .35em 0;">몸은 좀 괜찮은지 물었다. 랑은 몸이 괜찮았다. 정신에 대해 물었다면, 술술 뭔가를 말했을지도 모르겠다고 랑은 생각했다. 왜 피로가 없지? 열, 피곤함도</p>
<p style="margin:0 0 .35em 0;">무엇도 없다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">중년 남성은 랑을 지그시 쳐다보다 가끔 서류도 교대로 바라보다 입을 열었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">주변이 다 붕괴된 건 알고 있겠고</p>
<p style="margin:0 0 .35em 0;">피해액의 규모, 충격파의 수치 뭐 그런 걸 다 떠나서도 3대 80이 안 될 것 같은 애가 멀쩡하다…</p>
<p style="margin:0 0 .35em 0;">1급 위험과 가장 가까이,</p>
<p style="margin:0 0 .35em 0;">그리고 둘은 초면이 아니다, 라고 내가 말하면 자네는 어떤 생각이 들 것 같나?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">&lt;애프터 셀렉트&gt; 로그인 화면을 띄어둔 채 랑은 있었다</p>
<p style="margin:0 0 .35em 0;">신변이 멀쩡한 채로 집으로 돌아왔다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">세계 기구 직속 부대 ROM은 인간 괴인화에 맞서 창설된 부대</p>
<p style="margin:0 0 .35em 0;">1급 위험</p>
<p style="margin:0 0 .35em 0;">괴물은</p>
<p style="margin:0 0 .35em 0;">안면의 붉은 초승달을 따 '붉은 달'로 불린다고 했다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">붉은 달</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 괴물의 입 모양을 떠올려봤다</p>
<p style="margin:0 0 .35em 0;">내게 오기 전</p>
<p style="margin:0 0 .35em 0;">무슨 말을 했던 거였어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">분명한 건 만나기 위해 왔다는 것이다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">1급 위험과 가장 가까이 있었던 자. 상처 없이 자리에 있었던 자. 두 번이나</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">나는</p>
<p style="margin:0 0 .35em 0;">뭘까?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑을 취재했던</p>
<p style="margin:0 0 .35em 0;">중년 남성 모군토는 감시 인원이 붙을 거라고 했다. 너무 불편하게 여기진 말라고, 보호이기도 한 것이니, 핫</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">루토나 시티 랑이 있는 거주지를 멀리서 체크하는 감시자들</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그러나 랑은 회복됨을 느낀다</p>
<p style="margin:0 0 .35em 0;">쿨해짐을 느낀다</p>
<p style="margin:0 0 .35em 0;">열</p>
<p style="margin:0 0 .35em 0;">붕괴</p>
<p style="margin:0 0 .35em 0;">피로도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">무엇도 없다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">'붉은 달'을 만난 이후로</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">중년 남성 모군토는 사고 관련 기사는 찾아보지 말라고 했다. 굳이 피곤해질 필요는 없다고</p>
<p style="margin:0 0 .35em 0;">랑은 그 말을 따랐다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">다음날 학교 게시판에</p>
<p style="margin:0 0 .35em 0;">랑, 패스트푸드 점장과 원조교제? 포스팅된 글이 있는 걸 보고(악의적 편집으로 둘 사이가 애틋하게 보이게끔 만들어 놨다)</p>
<p style="margin:0 0 .35em 0;">랑은 자신을 지난하게 괴롭혀왔던 일들이 기승을 부리고 있음을, 인정해야 했다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">더럽다 진짜</p>
<p style="margin:0 0 .35em 0;">다들 지나가며 툭툭 한마디의 돌을 던져도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">심장은 차갑게</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">'붉은 달'도 쟤가 부른 거 아니야?</p>
<p style="margin:0 0 .35em 0;">죽음이 누워있지 않더라도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 담임에게도 불려갔다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">사실 아니에요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 핸드폰을 보여줬다. 문자 내용으로</p>
<p style="margin:0 0 .35em 0;">점장이 꾸준하게 보낸 플러팅을 확인할 수 있었다. 랑의 읽씹도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그리고 이 사진</p>
<p style="margin:0 0 .35em 0;">자세히 보면 입꼬리가 이상하죠. 확대본을 가리키며 말했다</p>
<p style="margin:0 0 .35em 0;">픽셀이 튀어요. 누가 의도적으로 바꾼 것처럼</p>
<p style="margin:0 0 .35em 0;">저는 이때 웃지 않았거든요</p>
<p style="margin:0 0 .35em 0;">8일 전이에요</p>
<p style="margin:0 0 .35em 0;">가게 CCTV에도 기록이 있을 거예요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">이 정도를 저는 말할 수 있어요</p>
<p style="margin:0 0 .35em 0;">하지만 제가 무엇을 말해도 사람들은 믿지 않아요</p>
<p style="margin:0 0 .35em 0;">사람들은 믿고 싶은 것만 믿기 때문이에요</p>
<p style="margin:0 0 .35em 0;">그러니 보여주는 일밖에 세상엔 없는 거예요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">지금 라이브 방송을 당장 키고 패스트푸드점으로 가도 좋아요</p>
<p style="margin:0 0 .35em 0;">가볼까요?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">담임은 랑이 이렇게 빠르게, 냉정하게 말하는 모습을 처음 보았다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">뭐, 그렇지 음…</p>
<p style="margin:0 0 .35em 0;">아니, 아니. 라이브 방송까지는 하지 말고 또 일이 커지니깐? 응?</p>
<p style="margin:0 0 .35em 0;">선생님이 다 알아서 할게</p>
<p style="margin:0 0 .35em 0;">몸은 좀 괜찮지? 사실 이건 확인만 해보려고 한 거야. 전해줄 소식도 있고 해서, 하하</p>
<p style="margin:0 0 .35em 0;">음</p>
<p style="margin:0 0 .35em 0;">랑아</p>
<p style="margin:0 0 .35em 0;">네가 최우수 학생으로 뽑혔다. 아무래도 규모가 좀 있는 행사다 보니</p>
<p style="margin:0 0 .35em 0;">미리 준비를 좀 할 거야. 알고 있으라고. 이거 말하려고 부른 거였어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">최우수 학생</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 허울 좋은 감투라 느꼈다. 그날 별일이나 없었음 좋겠다고 생각하며</p>
<p style="margin:0 0 .35em 0;">담임과의 얘기를 마치고 복도를 걷는</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">창문으로 나무에 숨어 있는 감시 요원을 본다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">감시 요원보다 나무에 더 눈이 갔다</p>
<p style="margin:0 0 .35em 0;">나무는 숲이 될 가능성</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">숨는 게 아니라 자리다</p>
</div>`,
    series: "가우시안 블러",
    status: 'published'
  },
  {
    id: 28,
    title: "28화 악당 피셜 : 2막 시작",
    content: `<div style="font-family:Pretendard,'Noto Sans KR',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple SD Gothic Neo','Noto Sans','Malgun Gothic',sans-serif;font-size:16px;line-height:1.14;letter-spacing:-0.01em;color:#EEE;background:transparent;"><p style="margin:0 0 .35em 0;">오늘이지? 히네가 말했다</p>
<p style="margin:0 0 .35em 0;">원목 벤치 그늘에서</p>
<p style="margin:0 0 .35em 0;">축하한다고</p>
<p style="margin:0 0 .35em 0;">그 말엔 어떤 악의도 깃들어있지 않았다</p>
<p style="margin:0 0 .35em 0;">랑은 오늘따라 햇빛이 알 수 있게 따가웠다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">불과 몇 분 전 일이다</p>
<p style="margin:0 0 .35em 0;">히네는 악의적 편집을 자신이 한 거라고, 너 내가 썅년으로 만든 거라고</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 듣고만 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">넌 뭐든 쉬워 보였거든</p>
<p style="margin:0 0 .35em 0;">얼굴 예쁘지</p>
<p style="margin:0 0 .35em 0;">공부 잘하지</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 듣고만 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">관계에 애쓰지 않아도</p>
<p style="margin:0 0 .35em 0;">모두 우러러보니까</p>
<p style="margin:0 0 .35em 0;">그런 일(사기꾼의 딸 얘기)이 있었는데도 말야</p>
<p style="margin:0 0 .35em 0;">그랬지?</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">햇빛이 침묵을 머금고 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">사과하려고 부른 건 아니야</p>
<p style="margin:0 0 .35em 0;">히네는 랑을 빤히 쳐다봤다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">네가 나를 욕하고 때리더라도</p>
<p style="margin:0 0 .35em 0;">먼 과거의 일이 되더라도</p>
<p style="margin:0 0 .35em 0;">미안하진 않을 거야</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 듣고만 있었다</p>
<p style="margin:0 0 .35em 0;">원목 벤치의 그늘이</p>
<p style="margin:0 0 .35em 0;">랑과 히네의 얼굴을 머금고 있었다. 바람에 흔들리고 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">히네가 마지막으로 말했다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">나, 네가 무지 싫었어</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 몇 분 뒤 홀로 원목 벤치 그늘에서</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">하염없다</p>
<p style="margin:0 0 .35em 0;">랑은 거기서 더 무엇을 말할 수 있었을까</p>
<p style="margin:0 0 .35em 0;">조용함을 이기는 게 방법이었을까</p>
<p style="margin:0 0 .35em 0;">랑은</p>
<p style="margin:0 0 .35em 0;">멍하니 주변을 둘러봤다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">나무가 흔들리고 있었다. 숨어 있는 감시 요원도</p>
<p style="margin:0 0 .35em 0;">없이</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑이</p>
<p style="margin:0 0 .35em 0;">최우수 학생으로서 구령대로 가는 빛나는 걸음일 때</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">한 걸음</p>
<p style="margin:0 0 .35em 0;">장면이 지나간다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">장면은 랑이 고목에 매달려 있을 때를 그린다</p>
<p style="margin:0 0 .35em 0;">랑은 자신을 쳐다보는 수만의 시선을 느꼈다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">한 걸음 더</p>
<p style="margin:0 0 .35em 0;">장면이 지나가면</p>
<p style="margin:0 0 .35em 0;">최우수 학생으로서 랑은</p>
<p style="margin:0 0 .35em 0;">자신을 쳐다보는 수백의 시선을 느낀다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">계단을 오를 때. 한 걸음</p>
<p style="margin:0 0 .35em 0;">상승</p>
<p style="margin:0 0 .35em 0;">장면이 지나갔다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑의 다리가 후들거리는 모습이</p>
<p style="margin:0 0 .35em 0;">봉을 겨우 잡고 올라가는 모습이</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그날 모두가 열중쉬어 자세에서 쟤 왜 저래? 킥킥거렸고 안쓰러운 장면에 선생들은 난감했지만</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 상을 받은 뒤, 마이크 앞에 섰다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">거기서 무엇을 말해야 했을까, 생각합니다</p>
<p style="margin:0 0 .35em 0;">당시엔 그것이 최선이라 느꼈어도요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">전교생은 더 이상 시끄럽지 않았다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑은 차분히, 그러나 딱히 준비해오진 않은 말들을</p>
<p style="margin:0 0 .35em 0;">해 나갔다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">살아가는 건 매일</p>
<p style="margin:0 0 .35em 0;">계절을 보는 일이 아닐 겁니다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">비가 내리면 비를 보고. 눈을 보면 차가움을 알고</p>
<p style="margin:0 0 .35em 0;">오늘은 원목 벤치 그늘에서 햇볕을 쬐었습니다</p>
<p style="margin:0 0 .35em 0;">여름을 아는 것처럼요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">보이는 것처럼, 다가오는 것처럼</p>
<p style="margin:0 0 .35em 0;">살아가는 일이 매일의 계절이라면</p>
<p style="margin:0 0 .35em 0;">좋았을 거예요</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">살아간다는 건 참 어려운 일이니까</p>
<p style="margin:0 0 .35em 0;">보이지도, 다가오지도</p>
<p style="margin:0 0 .35em 0;">않는 것 같으니까</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그런 의도가 아니었어도</p>
<p style="margin:0 0 .35em 0;">사랑했어도</p>
<p style="margin:0 0 .35em 0;">상처받아서 울어도</p>
<p style="margin:0 0 .35em 0;">기뻐 웃어도</p>
<p style="margin:0 0 .35em 0;">전부가 아닐지도 모르겠어서</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">오늘 친구와 절교했어요. 어쩌면 모두와 평생</p>
<p style="margin:0 0 .35em 0;">어울리지도 않을</p>
<p style="margin:0 0 .35em 0;">인생을 보내며</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">저는 살아갈 거예요. 여름을 아는 것처럼 있을 테니까</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">그래도 살아가고 싶어요</p>
<p style="margin:0 0 .35em 0;">상 받았다고 자랑도 하고 싶고</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">감사합니다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑의 전교생 앞에서의 담백한 고백은 분명 다른 효과를 주는 듯했다</p>
<p style="margin:0 0 .35em 0;">말이 전부 이해 가지 않더라도</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">우와 뭔가 이상한데 멋진 애</p>
<p style="margin:0 0 .35em 0;">참 이상한 애</p>
<p style="margin:0 0 .35em 0;">자기만의 세계가 있는 애</p>
<p style="margin:0 0 .35em 0;">친해지고 싶지는 않은 애</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">여러 갈래로</p>
<p style="margin:0 0 .35em 0;">제 나름대로 길을 형성해내고 있었다</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">비난과 비웃음, 지금까지의 모욕과는 조금 다른</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">랑이 랑으로서</p>
<p style="margin:0 0 .35em 0;">바깥에 보여준 자신</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">-</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">맞은편</p>
<p style="margin:0 0 .35em 0;">건물 옥상에선 망원경으로 이를 지켜보는 가면 2인조가 있다</p>
<p style="margin:0 0 .35em 0;">직접 보는 건 처음이지? 어때?</p>
<p style="margin:0 0 .35em 0;">존예</p>
<p style="margin:0 0 .35em 0;">그리고 말도 잘하던데요? 뭐 쟤들은 다 모르겠지만</p>
<p style="margin:0 0 .35em 0;">내 딸이라서 그런가? 확실히 음,</p>
<p style="margin:0 0 .35em 0;">근데 붉은 달이 저주를 없애준 건 맞나 보다. 계단 올라갈 때 생각보다 잘 버티네?</p>
<p style="margin:0 0 .35em 0;">뭐… 전력은 아니긴 했지만요. 계속, 걸어놓을까요?</p>
<p style="margin:0 0 .35em 0;">됐어. 이제 2막 시작인 셈이니까. 랑은 그에게 더 다가갈 거야. 키튼은 구원이 되겠지</p>
<p style="margin:0;">&nbsp;</p>
<p style="margin:0 0 .35em 0;">우리는 잠시 지켜보다</p>
<p style="margin:0 0 .35em 0;">쾅</p>
<p style="margin:0 0 .35em 0;">비행기를 터트리면 되는 거야</p></div>`,
    series: "가우시안 블러",
    status: 'published'
  }
];

// Series list
const series = ["가우시안 블러", "르메끌의 오후", "우진과 쿄", "너의 콜센터"];

// Series info
const seriesInfo = {
  "가우시안 블러": {
    logline: "가우시안 블러는 랑과 미드나잇 키튼(이하 키틴)의 이야기를 엮은 현대 판타지+시 연재물이다. 보통 포토샵이나 영상 편집에서 쓰이는 가우시안 블러는 흐릿한 효과를 만들기 위해 이미지에 수학 함수를 적용한 것을 말한다. 여기서 적용 대상은 키틴의 기억이다. 블러의 효과는 전방위적이다. 그러나 바라보는 입장인 우리는 알아볼 수 있다. 저 너머에 있는 것이 무엇인지를. 정확히 예측할 수는 없지만 예감할 수 있다. 흐릿한 장면은 원본의 상실을 의미하며, 해석의 가능성을 조금이라도 높인 결과물이 된다. 한 사람의 기억을 없앰으로써 둘의 이야기를 슬쩍 점지해보는 것이다. 그러나 거기서 더 클로즈업하면 형태가 아닌 픽셀. 정사각형이 나오는 것이다. 나는 궁금해졌다. \"이 이야기는 사실 정사각형 픽셀로 이뤄져 있습니다. 이것을 확대본으로 보실까요.\" 물었을 때 사람들은 각각 무엇을 바라볼지를.",
    keywords: "#장편 #현대판타지 #로맨스"
  },
  "르메끌의 오후": {
    logline: "인간계에 좌천당하여 지루한 나날을 보내던 마녀 앞에 신화처럼 어떤 존재가 나타난다. 검은 연기로부터 탄생한 그자의 이름은 르메끌. 둘의 지독한 인연은 이 탄생으로부터 시작한다.",
    keywords: "#장편 #전생 #과거 #로맨스"
  },
  "우진과 쿄": {
    logline: "우진과 쿄는 같이 살고 있다.",
    keywords: "#단편 #현대 #일상 #반려동물 #강아지"
  },
  "너의 콜센터": {
    logline: "콜센터에 들어온 지도 어느덧 3개월이 지나고 있었다.",
    keywords: "#단편 #현대 #일상 #관계"
  }
};

export default function Poems() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedSeries, setSelectedSeries] = useState("가우시안 블러");
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{poem: Poem, highlights: string}[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const titleScrollRef = useRef<HTMLUListElement>(null);

  const EPISODES_PER_PAGE = 15;

  // 스크롤 위치 초기화 함수
  const resetScrollPositions = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const modalElement = document.querySelector('.poem-modal');
    if (modalElement) {
      (modalElement as HTMLElement).scrollTop = 0;
    }
    if (titleScrollRef.current) {
      titleScrollRef.current.scrollLeft = 0;
    }
  };

  // 데스크탑 드래그 스크롤 설정
  useEffect(() => {
    const setupDragScroll = (element: HTMLElement | null) => {
      if (!element) return;
      
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
        element.style.cursor = 'grabbing';
      };

      const handleMouseUp = () => {
        isDown = false;
        element.style.cursor = 'grab';
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 2;
        element.scrollLeft = scrollLeft - walk;
      };

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          element.scrollLeft += e.deltaY;
        }
      };

      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseUp);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseUp);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('wheel', handleWheel);
      };
    };

    const titleCleanup = setupDragScroll(titleScrollRef.current);

    return () => {
      titleCleanup?.();
    };
  }, [selectedSeries]);

  const filteredPoems = selectedTag 
    ? poems.filter(poem => seriesInfo[poem.series].keywords.includes(selectedTag))
    : poems.filter(poem => poem.series === selectedSeries);

  // 페이지네이션 로직
  const totalPages = Math.ceil(filteredPoems.length / EPISODES_PER_PAGE);
  const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
  const endIndex = startIndex + EPISODES_PER_PAGE;
  const currentPagePoems = filteredPoems.slice(startIndex, endIndex);

  const getNavigationButtons = (currentPoem: Poem) => {
    const seriesPoems = poems.filter(p => p.series === currentPoem.series && p.status === 'published');
    const currentIndex = seriesPoems.findIndex(p => p.id === currentPoem.id);
    
    const prevPoem = currentIndex > 0 ? seriesPoems[currentIndex - 1] : null;
    const nextPoem = currentIndex < seriesPoems.length - 1 ? seriesPoems[currentIndex + 1] : null;

    return { prevPoem, nextPoem };
  };

  const handleSeriesChange = (index: number) => {
    setCurrentSeriesIndex(index);
    setSelectedSeries(series[index]);
    setExpandedDescription(false);
    setSelectedTag(null);
    setCurrentPage(1);
    resetScrollPositions();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSeriesIndex < series.length - 1) {
      handleSeriesChange(currentSeriesIndex + 1);
    }
    if (isRightSwipe && currentSeriesIndex > 0) {
      handleSeriesChange(currentSeriesIndex - 1);
    }
  };

  const truncateText = (text: string, lines: number = 5) => {
    const words = text.split(' ');
    const wordsPerLine = 12;
    const maxWords = lines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results: {poem: Poem, highlights: string}[] = [];
    
    poems.forEach(poem => {
      if (poem.status === 'published' && poem.content.includes(query)) {
        const highlightedContent = poem.content.replace(
          new RegExp(query, 'gi'),
          `<mark class="bg-yellow-300 text-black">$&</mark>`
        );
        results.push({ poem, highlights: highlightedContent });
      }
    });

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedSeries("");
    setCurrentPage(1);
    resetScrollPositions();
  };

  const handlePoemNavigation = (poem: Poem) => {
    setSelectedPoem(poem);
    resetScrollPositions();
  };

  const renderKeywords = (keywords: string) => {
    return keywords.split(' ').map((keyword, index) => (
      <span
        key={index}
        className={`cursor-pointer hover:text-gray-200 transition-colors ${selectedTag === keyword ? 'bg-yellow-300 text-black px-1 rounded' : ''}`}
        onClick={() => handleTagClick(keyword)}
      >
        {keyword }
        {index < keywords.split(' ').length - 1 ? ' ' : ''}
      </span>
    ));
  };

  const handleSeriesClick = (seriesName: string) => {
    const index = series.indexOf(seriesName);
    if (index !== -1) {
      handleSeriesChange(index);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="py-6 md:py-8 lg:py-12 px-4 md:px-6 border-b border-red-500">
        <div className="flex justify-between items-center mb-6 md:mb-8 lg:mb-12">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base"
          >
            Intro
          </button>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Series</h1>
          <button
            onClick={() => navigate('/contact')}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-sm md:text-base"
          >
            Contact
          </button>
        </div>

        {/* Series Title List */}
        <section aria-label="series-list" className="mb-4">
          <div className="works-wrap w-full">
            <ul 
              ref={titleScrollRef}
              className="works-scroll flex gap-7 px-4 pb-4 overflow-x-auto whitespace-nowrap md:justify-center"
              role="list"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                scrollSnapType: 'none',
                userSelect: 'none',
                cursor: 'grab',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {series.map((seriesName, index) => (
                <li key={seriesName}>
                  <button 
                    className={`title-link relative flex-shrink-0 bg-transparent border-0 pb-2 font-bold leading-tight transition-colors duration-200 whitespace-nowrap ${
                      selectedSeries === seriesName
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                    style={{
                      fontSize: 'clamp(18px, 3vw, 28px)',
                      letterSpacing: '-0.01em'
                    }}
                    data-slug={seriesName.toLowerCase().replace(/\s+/g, '-')}
                    aria-current={selectedSeries === seriesName}
                    onClick={() => {
                      handleSeriesClick(seriesName);
                    }}
                  >
                    {seriesName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tag Filter Header */}
        {selectedTag && (
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedTag(null)}
                className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-lg"></i>
              </button>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                {selectedTag} 작품들
              </h2>
            </div>
          </div>
        )}

        {/* Series Description */}
        {!selectedTag && selectedSeries && seriesInfo[selectedSeries] && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-3 border-b border-gray-800">
            <div className="space-y-3 md:space-y-4">
              <div className="text-white text-xs md:text-sm lg:text-base leading-relaxed">
                {expandedDescription 
                  ? seriesInfo[selectedSeries].logline
                  : truncateText(seriesInfo[selectedSeries].logline)
                }
                {!expandedDescription && seriesInfo[selectedSeries].logline.length > truncateText(seriesInfo[selectedSeries].logline).length && (
                  <button
                    onClick={() => setExpandedDescription(true)}
                    className="text-red-400 hover:text-red-300 ml-2 cursor-pointer"
                  >
                    ...더보기
                  </button>
                )}
              </div>
              {expandedDescription && (
                <button
                  onClick={() => setExpandedDescription(false)}
                  className="text-red-400 hover:text-red-300 cursor-pointer text-xs md:text-sm"
                >
                  간략히
                </button>
              )}
              <div className="text-gray-400 text-xs md:text-sm">
                {renderKeywords(seriesInfo[selectedSeries].keywords)}
              </div>
            </div>
          </div>
        )}

        {/* Tag Filter Results */}
        {selectedTag && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-12">
            {(() => {
                const taggedSeries = Object.entries(seriesInfo).filter(([_, info]) => 
                  info.keywords.includes(selectedTag)
                );
                
                return taggedSeries.map(([seriesName, info]) => (
                  <div
                    key={seriesName}
                    className="border border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer p-4"
                    onClick={() => handleSeriesClick(seriesName)}
                  >
                    <div className="text-red-400 text-xs mb-2">{seriesName}</div>
                    <div className="text-white text-sm md:text-base font-bold mb-3">{info.keywords.split(' ').map((keyword, index) => (
                      <span
                        key={index}
                        className={keyword === selectedTag ? 'bg-yellow-300 text-black px-1 rounded' : ''}
                      >
                        {keyword}
                        {index < info.keywords.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))}</div>
                  </div>
                ));
            })()}
          </div>
        )}

        {/* Search Results */}
        {showSearchResults && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg md:text-xl font-bold text-white">
                검색 결과 ({searchResults.length}개)
              </h2>
              <button
                onClick={() => {
                  setShowSearchResults(false);
                  setSearchQuery("");
                }}
                className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
            <div className="space-y-4">
              {searchResults.map(({ poem, highlights }, index) => (
                <div
                  key={index}
                  className="border border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer p-4"
                  onClick={() => handlePoemNavigation(poem)}
                >
                  <div className="text-red-400 text-xs mb-2">{poem.series}</div>
                  <div className="text-white text-sm md:text-base font-bold mb-3">{poem.title}</div>
                  <div 
                    className="text-gray-300 text-xs md:text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlights.substring(0, 200) + '...' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poems List */}
        {!showSearchResults && !selectedTag && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-12">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              {currentPagePoems.map((poem) => (
                <div
                  key={poem.id}
                  className={`flex items-center justify-between py-3 md:py-4 px-3 md:px-4 lg:px-6 border border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer ${
                    poem.status === 'upcoming' ? 'opacity-60' : ''
                  }`}
                  onClick={() => poem.status === 'published' && handlePoemNavigation(poem)}
                >
                  <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
                    <div className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center flex-shrink-0">
                      {poem.status === 'published' ? (
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                      ) : (
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-sm md:text-base lg:text-lg text-white hover:text-red-400 transition-colors duration-300 leading-tight">
                      {selectedTag && <span className="text-red-400 text-xs mr-2">{poem.series}</span>}
                      {poem.title}
                    </div>
                  </div>
                  {poem.status === 'upcoming' && (
                    <div className="text-gray-500 text-xs md:text-sm">
                      공개 예정
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm border transition-colors ${
                    currentPage === 1
                      ? 'border-gray-700 text-gray-500 cursor-not-allowed'
                      : 'border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 cursor-pointer'
                  }`}
                >
                  이전
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-sm border transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'border-red-500 text-red-400 bg-red-500/10'
                          : 'border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm border transition-colors ${
                    currentPage === totalPages
                      ? 'border-gray-700 text-gray-500 cursor-not-allowed'
                      : 'border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 cursor-pointer'
                  }`}
                >
                  다음
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="py-4 md:py-6 lg:py-8 px-4 md:px-6 border-t border-gray-800 mt-6 md:mt-8 lg:mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-gray-500 text-xs mb-2">© 2024 kimbyeonggwan. All rights reserved.</div>
            </div>
            
            {/* Search Section */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 max-w-md w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="키워드 검색..."
                    className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-xs md:text-sm px-3 py-2 pr-10 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <i className="ri-search-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Poem Modal */}
        {selectedPoem && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 md:p-4 z-50">
            <div className="bg-gray-900 border border-gray-700 max-w-2xl w-full max-h-[95vh] md:max-h-[90vh] flex flex-col poem-modal">
              {/* Fixed Header */}
              <div className="p-3 md:p-6 lg:p-8 border-b border-gray-700 flex-shrink-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2 md:pr-4">
                    <div className="text-red-400 text-xs md:text-sm mb-1 md:mb-2">{selectedPoem.series}</div>
                    <h2 className="text-base md:text-lg lg:text-2xl font-bold text-white mb-2 leading-tight">
                      {selectedPoem.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedPoem(null)}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                  >
                    <i className="ri-close-line text-lg md:text-xl lg:text-2xl"></i>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-3 md:p-6 lg:p-8">
                  <div 
                    className="text-gray-300 text-xs md:text-sm lg:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedPoem.content }}
                  />
                </div>
              </div>
              
              {/* Fixed Navigation */}
              <div className="p-3 md:p-6 lg:p-8 border-t border-gray-700 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    {(() => {
                      const { prevPoem } = getNavigationButtons(selectedPoem);
                      return prevPoem ? (
                        <button
                          onClick={() => handlePoemNavigation(prevPoem)}
                          className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <span className="text-base md:text-lg">⏴</span>
                          <span className="text-xs md:text-sm">이전화</span>
                        </button>
                      ) : <div></div>;
                    })()}
                  </div>
                  
                  <div>
                    {(() => {
                      const { nextPoem } = getNavigationButtons(selectedPoem);
                      return nextPoem ? (
                        <button
                          onClick={() => handlePoemNavigation(nextPoem)}
                          className="flex items-center space-x-1 md:space-x-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <span className="text-xs md:text-sm">다음화</span>
                          <span className="text-base md:text-lg">⏵</span>
                        </button>
                      ) : <div></div>;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
