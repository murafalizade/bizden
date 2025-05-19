import { UserAddOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';

const steps = [
  {
    title: '1. Qeydiyyatdan keç',
    desc: 'Hesab yarat və məlumatlarını doldur.',
    icon: <UserAddOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
  },
  {
    title: '2. Xidmətləri araşdır',
    desc: 'Sənə uyğun endirim və imkanları tap.',
    icon: <SearchOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
  },
  {
    title: '3. Faydalan',
    desc: 'Seçdiyin xidmətdən rahatlıqla istifadə et.',
    icon: <SmileOutlined style={{ fontSize: 48, color: '#faad14' }} />,
  },
];

export const HowSection = () => {
  return (
    <section id="how" className="bg-white text-center px-5 py-20">
      <h2 className="text-3xl font-semibold mb-4">Necə işləyir?</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-8 w-full sm:w-[45%] md:w-[30%] min-h-[240px] flex flex-col items-center"
          >
            <div className="mb-5">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
