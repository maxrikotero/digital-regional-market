export interface Producer {
  id: string;
  name: string;
  description: string;
  history: string;
  region: string;
  image_url: string;
  images: string[]; // Gallery for production process
  contact_info: string;
}

export interface Product {
  id: string;
  producer_id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image_url: string;
  stock: number;
  active: boolean;
}

export const MOCK_PRODUCERS: Producer[] = [
  {
    id: "1",
    name: "Finca El Sol",
    description:
      "Familia de productores dedicados al cultivo orgánico en Seclantás. Tercera generación trabajando la tierra con métodos ancestrales.",
    history:
      "En Finca El Sol, cultivamos la tierra respetando los ciclos de la naturaleza. Nuestra historia comienza hace tres generaciones en el corazón de Seclantás. Utilizamos métodos ancestrales de riego y evitamos completamente los agroquímicos para garantizar el sabor puro de nuestros tomates y zapallos. Cada cosecha es una celebración del trabajo familiar.",
    region: "Seclantás",
    image_url:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80", // Tomato details
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80", // Farm hands
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80", // Soil work
      "https://images.unsplash.com/photo-1625246333195-bf404ec8cf7d?auto=format&fit=crop&q=80", // Fields
    ],
    contact_info: "+5493871234567",
  },
  {
    id: "2",
    name: "Artesanías del Valle",
    description:
      "Recuperando técnicas de tejido en telar criollo con lana local y tintes naturales. Ponchos y tapices hechos con amor en Cachi.",
    history:
      "Manos que tejen historias. En Artesanías del Valle recuperamos las técnicas de tejido en telar criollo. Trabajamos con lana de llama y oveja esquilada localmente, teñida con pigmentos naturales extraídos de las plantas de los cerros de Cachi. Cada poncho y tapiz lleva semanas de dedicación y amor por nuestra cultura.",
    region: "Cachi",
    image_url:
      "https://images.unsplash.com/photo-1455620611406-966ca681f280?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1520013327663-e3c6fd8b52f1?auto=format&fit=crop&q=80", // Textile close up
      "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&q=80", // Wool
      "https://images.unsplash.com/photo-1584288056254-0570b777c229?auto=format&fit=crop&q=80", // Loom work (generic)
      "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80", // Patterns
    ],
    contact_info: "+5493877654321",
  },
  {
    id: "3",
    name: "Familia González",
    description:
      "Dulces caseros con recetas de la abuela. Frutas de estación de Molinos cocinadas a fuego lento en paila de cobre.",
    history:
      "Dulces que saben a hogar. La Familia González mantiene vivas las recetas de la abuela. Seleccionamos cuidadosamente los cayotes y frutas de estación de Molinos para cocinarlos en pailas de cobre a fuego lento. Sin conservantes, solo fruta y azúcar, como se hacía antes.",
    region: "Molinos",
    image_url:
      "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1587394622722-680c6a992643?auto=format&fit=crop&q=80", // Jars
      "https://images.unsplash.com/photo-1629156372070-5b6515ba9226?auto=format&fit=crop&q=80", // Cooking
      "https://images.unsplash.com/photo-1606914469725-e39c3715504d?auto=format&fit=crop&q=80", // Fruit prep
      "https://images.unsplash.com/photo-1563729768640-d36d37536952?auto=format&fit=crop&q=80", // Serving
    ],
    contact_info: "+5493879998887",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "101",
    producer_id: "1",
    name: "Tomates Cherry Orgánicos",
    description: "Tomates cherry dulces, cultivados sin agroquímicos.",
    price: 1500,
    unit: "kg",
    category: "Vegetables",
    image_url:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80",
    stock: 20,
    active: true,
  },
  {
    id: "102",
    producer_id: "1",
    name: "Zapallo Anco",
    description: "Zapallos de estación, ideales para sopas.",
    price: 800,
    unit: "unidad",
    category: "Vegetables",
    image_url:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80",
    stock: 50,
    active: true,
  },
  {
    id: "201",
    producer_id: "2",
    name: "Poncho Salteño",
    description: "Tejido a mano con lana de llama.",
    price: 45000,
    unit: "unidad",
    category: "Crafts",
    image_url:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80",
    stock: 5,
    active: true,
  },
  {
    id: "301",
    producer_id: "3",
    name: "Dulce de Cayote",
    description: "Tradicional dulce en frasco de 500g.",
    price: 3500,
    unit: "frasco",
    category: "Preserves",
    image_url:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80",
    stock: 15,
    active: true,
  },
];
