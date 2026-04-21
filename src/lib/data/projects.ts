import "server-only";

export type ProjectCategory = "startup" | "hardware" | "show" | "rnd";

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  category: ProjectCategory;
  tags: string[];
  overview?: string;
  tech?: string[];
  outcome?: string;
  coverUrl?: string;
  featured?: boolean;
  order?: number;
};

export const MOCK_PROJECTS: Project[] = [
  {
    slug: "aura-robotics",
    title: "AURA Robotics",
    year: "2024",
    role: "CTO & Co-founder",
    category: "startup",
    tags: ["Robotics", "AI", "Embedded"],
    overview:
      "Автономная сервисная платформа на колёсной базе с компьютерным зрением и манипулятором. Запущена пилотная партия в индустриальной среде.",
    tech: ["ROS 2", "Jetson Orin", "Python", "PyTorch", "STM32", "CAN bus"],
    outcome:
      "Подтверждённый product-market fit с тремя индустриальными заказчиками и привлечённый seed-раунд.",
    featured: true,
    order: 0,
  },
  {
    slug: "helix-drone",
    title: "Helix Drone",
    year: "2023",
    role: "Lead Engineer",
    category: "hardware",
    tags: ["UAV", "Mechatronics", "PCB"],
    overview:
      "Компактный коаксиальный дрон с собственным полётным контроллером и системой стабилизации. Полный цикл от схемотехники до серийного прототипа.",
    tech: ["KiCad", "STM32H7", "C++", "PX4", "Carbon composites", "BLDC"],
    outcome:
      "Серия из 12 лётных прототипов и контракт на производство первой партии.",
    featured: true,
    order: 1,
  },
  {
    slug: "atlas-stage-show",
    title: "ATLAS Stage Show",
    year: "2024",
    role: "Technical Director",
    category: "show",
    tags: ["Stage Tech", "LED", "Automation"],
    overview:
      "Иммерсивное технологическое шоу с управляемыми кинетическими конструкциями, LED-полем и синхронизированным звуком. Продюсирование инженерной части под ключ.",
    tech: ["DMX512", "Art-Net", "TouchDesigner", "Unreal Engine", "PLC", "Servo motors"],
    outcome:
      "12 показов на профильных площадках и приз за технологическое решение года.",
    featured: true,
    order: 2,
  },
  {
    slug: "nova-rnd-lab",
    title: "Nova R&D Lab",
    year: "2022",
    role: "Founder",
    category: "rnd",
    tags: ["Prototyping", "Research", "Materials"],
    overview:
      "Внутренняя R&D-лаборатория для быстрых экспериментов с материалами, печатью и механикой. Создана как площадка для тестирования рисковых идей.",
    tech: ["Fusion 360", "SLA Printing", "CNC", "Composites", "Arduino", "Thermal analysis"],
    outcome:
      "Из 18 экспериментов 4 переросли в коммерческие прототипы.",
    order: 3,
  },
  {
    slug: "pulse-wearable",
    title: "Pulse Wearable",
    year: "2023",
    role: "CTO",
    category: "startup",
    tags: ["Wearable", "BLE", "Firmware"],
    overview:
      "Носимое устройство для мониторинга биометрии с миниатюрной PCB и фирменной BLE-стеком. Архитектура продукта и технический найм с нуля.",
    tech: ["nRF52", "Zephyr RTOS", "BLE 5.2", "Altium", "React Native", "TypeScript"],
    outcome:
      "Запуск MVP, 2 000 устройств в полях и подтверждённая retention-метрика.",
    order: 4,
  },
  {
    slug: "kinetic-installation",
    title: "Kinetic Installation",
    year: "2022",
    role: "Engineering Lead",
    category: "show",
    tags: ["Kinetics", "Servo", "Art-Tech"],
    overview:
      "Художественная кинетическая инсталляция из 64 синхронизированных элементов с реалтайм-управлением. Полная механика, электроника и софт.",
    tech: ["Stepper motors", "RS-485", "ESP32", "TouchDesigner", "Custom PCB", "Aluminium"],
    outcome:
      "Премьера на международной выставке и тур из четырёх городов.",
    order: 5,
  },
  {
    slug: "vertex-pcb-platform",
    title: "Vertex PCB Platform",
    year: "2024",
    role: "Architect",
    category: "hardware",
    tags: ["PCB", "DFM", "Tooling"],
    overview:
      "Внутренняя платформа шаблонов и DFM-проверок для ускорения PCB-разработки. Стандартизировала библиотеки и снизила цикл ревизий.",
    tech: ["Altium Designer", "KiCad", "Python", "GitLab CI", "JLCPCB API", "DFM rules"],
    outcome:
      "Сокращение времени на новую плату на 40% и три успешных серийных запуска.",
    order: 6,
  },
  {
    slug: "orbit-edge-ai",
    title: "Orbit Edge AI",
    year: "2025",
    role: "CTO",
    category: "rnd",
    tags: ["Edge AI", "Vision", "Embedded"],
    overview:
      "Стек edge-инференса для компактных камер с собственными моделями детекции. Оптимизация под низкое энергопотребление и оффлайн-режим.",
    tech: ["TensorRT", "ONNX", "Jetson Nano", "OpenCV", "C++", "Rust"],
    outcome:
      "Достижение 30 FPS при < 5 Вт и пилотные интеграции у двух клиентов.",
    order: 7,
  },
  {
    slug: "forge-cnc-suite",
    title: "Forge CNC Suite",
    year: "2021",
    role: "Hardware Lead",
    category: "hardware",
    tags: ["CNC", "Motion", "Control"],
    overview:
      "Семейство CNC-станков с собственным контроллером движения и G-code препроцессором. От механики до пользовательского интерфейса.",
    tech: ["GRBL", "STM32", "Step/Dir drivers", "Linear rails", "Electron", "TypeScript"],
    outcome:
      "Запуск трёх моделей и десятки установок в мастерских и лабораториях.",
    order: 8,
  },
];

export async function getAllProjects(): Promise<Project[]> {
  return MOCK_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return MOCK_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const featured = MOCK_PROJECTS.filter((p) => p.featured === true);
  const pool = featured.length > 0 ? featured : MOCK_PROJECTS;
  return pool.slice(0, limit);
}
