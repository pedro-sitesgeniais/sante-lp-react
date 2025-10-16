import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import {
  TrendingUp,
  Award,
  Leaf,
  ShieldCheck,
  Star,
  Package,
  Sparkles,
  Truck,
  Clock,
  HeadphonesIcon,
  Menu,
  X,
  Flame,
  Crown,
  ChefHat,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    empresa: '',
    cnpj: '',
    responsavel: '',
    telefone: '',
    email: ''
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Função para formatar CNPJ
  const formatCNPJ = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }
    return value
  }

  // Função para formatar telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
    }
    return value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // URL do Google Apps Script Web App (você vai configurar isso)
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || ''

      if (!GOOGLE_SCRIPT_URL) {
        alert('⚠️ Configuração pendente! Consulte o arquivo GOOGLE_SHEETS_SETUP.md')
        setIsSubmitting(false)
        return
      }

      // Preparar dados para envio
      const dataToSend = {
        timestamp: new Date().toLocaleString('pt-BR'),
        empresa: formData.empresa,
        cnpj: formData.cnpj,
        responsavel: formData.responsavel,
        telefone: formData.telefone,
        email: formData.email,
        origem: 'Landing Page B2B'
      }

      // Enviar para Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })

      // Limpar formulário
      setFormData({
        empresa: '',
        cnpj: '',
        responsavel: '',
        telefone: '',
        email: ''
      })

      // Feedback de sucesso
      alert('✅ Obrigado! Seus dados foram enviados com sucesso.\n\nEntraremos em contato em breve com o catálogo e condições especiais para revendedores.')

    } catch (error) {
      console.error('Erro ao enviar:', error)
      alert('❌ Ops! Ocorreu um erro ao enviar seus dados.\n\nPor favor, tente novamente ou entre em contato pelo WhatsApp: (17) 9 9198-2372')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    // Aplicar máscaras
    if (name === 'cnpj') {
      formattedValue = formatCNPJ(value)
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value)
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    })
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  // Dados dos produtos com informações detalhadas
  const products = [
    {
      id: 1,
      name: "Banana Passa com Chocolate 70%",
      category: "Linha Snacks",
      cacao: "70%",
      weight: "80g",
      description: "Banana passa coberta com chocolate amargo 70% cacau. Rico em potássio, fibras e antioxidantes.",
      image: "/banana.webp",
      badges: ["Mais Vendido", "Vegano", "Sem Açúcar"],
      badgeColors: {
        "Mais Vendido": "bg-orange-100 text-orange-800",
        "Vegano": "bg-green-100 text-green-800",
        "Sem Açúcar": "bg-blue-100 text-blue-800"
      }
    },
    {
      id: 2,
      name: "Damasco com Chocolate 55%",
      category: "Linha Snacks",
      cacao: "55%",
      weight: "80g",
      description: "Damasco turco premium coberto com chocolate vegano 55% cacau. Fonte natural de fibras e vitaminas.",
      image: "/damasco.webp",
      badges: ["Vegano", "Sem Glúten"],
      badgeColors: {
        "Vegano": "bg-green-100 text-green-800",
        "Sem Glúten": "bg-purple-100 text-purple-800"
      }
    },
    {
      id: 3,
      name: "Castanhas Mix com Chocolate 70%",
      category: "Linha Snacks",
      cacao: "70%",
      weight: "80g",
      description: "Mix de castanhas nobres com chocolate amargo 70% cacau. Rica fonte de proteína vegetal e gorduras boas.",
      image: "/castanha.webp",
      badges: ["Premium", "Proteína"],
      badgeColors: {
        "Premium": "bg-amber-100 text-amber-800",
        "Proteína": "bg-red-100 text-red-800"
      }
    },
    {
      id: 4,
      name: "Bombons Artesanais Premium",
      category: "Linha Premium",
      cacao: "55%",
      weight: "100g",
      description: "Bombons artesanais recheados, perfeitos para presentear ou vender em ocasiões especiais. Sabor sofisticado.",
      image: "/bombons.webp",
      badges: ["Artesanal", "Premium"],
      badgeColors: {
        "Artesanal": "bg-brown-100 text-brown-800",
        "Premium": "bg-amber-100 text-amber-800"
      }
    },
    {
      id: 5,
      name: "Gotas de Chocolate 55% Cacau",
      category: "Linha Culinária",
      cacao: "55%",
      weight: "500g",
      description: "Gotas profissionais para confeitaria e panificação. Derretimento perfeito e sabor equilibrado.",
      image: "/gotas.webp",
      badges: ["Profissional", "Kosher"],
      badgeColors: {
        "Profissional": "bg-indigo-100 text-indigo-800",
        "Kosher": "bg-teal-100 text-teal-800"
      }
    },
    {
      id: 6,
      name: "Mini Gotas Chocolate 70%",
      category: "Linha Culinária",
      cacao: "70%",
      weight: "500g",
      description: "Mini gotas para decoração de bolos, cookies e brownies. Tamanho ideal para receitas gourmet.",
      image: "/minigotas.webp",
      badges: ["Vegano", "Kosher"],
      badgeColors: {
        "Vegano": "bg-green-100 text-green-800",
        "Kosher": "bg-teal-100 text-teal-800"
      }
    }
  ]

  // Diferenciais visuais
  const differentials = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Vegano",
      description: "Livre de ingredientes de origem animal. Chocolates éticos e sustentáveis.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Sem Lactose & Glúten",
      description: "Produtos seguros para intolerantes. Inclusão alimentar sem abrir mão do sabor.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Artesanal",
      description: "Produção em pequenos lotes com controle rigoroso de qualidade.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificação Kosher",
      description: "Certificado por autoridade rabínica. Amplie seu mercado consumidor.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Ingredientes Premium",
      description: "Cacau nobre, adoçantes naturais e frutas selecionadas de fornecedores certificados.",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega Nacional",
      description: "Enviamos para todo o Brasil com embalagem especial que garante a integridade.",
      color: "from-red-400 to-rose-500"
    }
  ]

  // Avaliações reais do Google My Business
  const testimonials = [
    {
      name: "Luis Carlos Dias",
      business: "Kavanah Empório Gourmet",
      text: "Nós do Kavanah Empório Gourmet, adoramos os chocolates Santé Cacau. Artesanal, de sabor único e especial em cada mordida, uma delícia 😋.",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXIKZjxHiUCPdhL0l4nOezIyVcm2Vxnv7VcDJ4z8Wr13eGdUsDK6g=s120-c-rp-mo-br100"
    },
    {
      name: "Empório 2 Irmãos",
      business: "Parceiro Revendedor",
      text: "Atendimento rápido, entrega rápida e produtos de excelente qualidade. Super indico!",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVusXD8LN4dbEg5I0j846wo5z40G-J_gZQ6uANy2LaBY6biTaI=s120-c-rp-mo-br100"
    },
    {
      name: "Mila Regina",
      business: "Revendedora",
      text: "Excelente atendimento e produtos! Clientes nem percebem diferença por ser vegano!",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWWc4XLHrozFm6MpF1X4olDVYF_Dq91b1ZhxvjuIKqhKlWwZPMAsA=s120-c-rp-mo-ba2-br100"
    },
    {
      name: "Rafaela Raposo",
      business: "Cliente B2B",
      text: "A Santé Cacau dispõe de um excelente atendimento com uma consultoria acolhedora e de fácil acesso. Os chocolates são de ótima qualidade e vieram bem embalados e acondicionados chegando em perfeito estado.",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVWtd2NLy4dQNlKlUmiToy3MjxYWsLb1bzwT6fIrF7BhORAdHLiQQ=s120-c-rp-mo-br100"
    },
    {
      name: "Danieli Dovanci",
      business: "Cliente B2B",
      text: "Atendimento nota 10, chocolates maravilhosos, entrega, embalagem, tudo perfeito.",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVZ2zTi-9Lr70mY7lA-U6isa3jilS3yI4QvKBQxghx_BrhIFOW_Ww=s120-c-rp-mo-br100"
    },
    {
      name: "Claudia Rosin",
      business: "Consumidora Fiel",
      text: "Consumo esse chocolate há alguns anos e posso afirmar que é maravilhoso! Além de muito saboroso, é saudável, sem aditivos e vegano. Super recomendo.",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocKq5nRc4vbDEpNXxYZyQjIeab4lAJZhw03o9Fqn65tVrgwxRpk=s120-c-rp-mo-br100"
    },
    {
      name: "Luana Malaquias",
      business: "Cliente",
      text: "Já conheço a qualidade dos produtos, mas o que me chamou mais atenção, foi o atendimento prestado pela colaboradora Luciana... que atendimento impecável, simpática e resolutiva, uma excelente profissional.",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXTby_5uSffpdFjXkKu2xzYkY4CjEIUCvaTdIXCjLf1TjAH-_0HBg=s120-c-rp-mo-br100"
    },
    {
      name: "Carlos Eduardo Gantmanis",
      business: "Cliente",
      text: "A melhor possível! Desde o primeiro atendimento até a entrega final, tudo excelente! Cortesia e amabilidade não faltaram! Fico muitíssimo grato!",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWerEQGTENBqmy5tJM4_8S8D-T9rrCm_PdQOLIXVyvXWxjcyQc=s120-c-rp-mo-br100"
    },
    {
      name: "Nathalia Andrade",
      business: "Cliente",
      text: "Tudo incrível e delicioso!! As trufas, maravilhosas. O ponto alto, foi o atendimento!!! Atendimento incrível!!",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVNk15h09VxQfGKyr_6ssbcUb5bYy3iZ1nhFAW95gKNegbq2tjgkw=s120-c-rp-mo-br100"
    }
  ]

  // FAQ com ícones
  const faqItems = [
    {
      icon: <Package className="w-5 h-5" />,
      question: "Qual é o pedido mínimo inicial?",
      answer: "Nosso pedido mínimo é pensado para que você possa começar com um investimento acessível e testar a aceitação dos produtos em sua loja. Entre em contato para receber a tabela de preços e condições especiais para novos parceiros."
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      question: "Vocês oferecem material de marketing?",
      answer: "Sim! Fornecemos um kit completo de boas-vindas com materiais digitais para redes sociais, fotos profissionais dos produtos, displays de ponto de venda (PDV) e até scripts de vendas para ajudar a impulsionar suas vendas desde o primeiro dia."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      question: "Qual o prazo de entrega?",
      answer: "O prazo de entrega varia conforme a sua localidade. Para a maioria das capitais, o prazo médio é de 5 a 7 dias úteis após a confirmação do pagamento. Regiões mais distantes podem levar até 10 dias úteis. Trabalhamos com transportadoras confiáveis e fornecemos código de rastreamento."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      question: "Como funciona a política de troca?",
      answer: "Garantimos a qualidade de todos os nossos produtos. Caso receba algum item com defeito de fabricação ou avariado no transporte, realizamos a troca sem custos adicionais. Basta entrar em contato com nosso time de suporte ao parceiro em até 7 dias após o recebimento."
    },
    {
      icon: <HeadphonesIcon className="w-5 h-5" />,
      question: "Qual o suporte oferecido aos revendedores?",
      answer: "Oferecemos suporte completo via WhatsApp, e-mail e telefone. Nossa equipe está pronta para ajudar com dúvidas sobre produtos, pedidos, estratégias de venda e até treinamento sobre os diferenciais dos chocolates para que você possa apresentá-los melhor aos seus clientes."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      question: "Qual a margem de lucro para revendedores?",
      answer: "Nossa estrutura de preços foi desenvolvida para garantir uma margem competitiva e atrativa para nossos parceiros. A margem varia conforme o volume de compra, mas geralmente fica entre 30% a 50%. Entre em contato para conhecer nossa tabela completa de preços B2B."
    }
  ]

  const navItems = [
    { label: "Produtos", href: "produtos" },
    { label: "Diferenciais", href: "diferenciais" },
    { label: "Depoimentos", href: "depoimentos" },
    { label: "Nossa História", href: "historia" },
    { label: "FAQ", href: "faq" },
    { label: "Contato", href: "hero" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/Logo-Sante-Cacau.webp"
                alt="Santé Cacau"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-amber-100 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('hero')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Seja Parceiro
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-amber-100 hover:text-white transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('hero')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold mt-2"
              >
                Seja Parceiro
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section id="hero" className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Vídeo à Esquerda - 90dvh */}
            <div className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-24" style={{ height: '90dvh' }}>
                <div className="relative h-full rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/fotovideo.webp"
                  >
                    <source src="/Video-2-Trafego-Meta.mp4" type="video/mp4" />
                    Seu navegador não suporta a reprodução de vídeos.
                  </video>
                </div>
              </div>
            </div>

            {/* Texto + Formulário à Direita */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Texto Acima do Formulário */}
              <div className="space-y-4">
                <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm inline-flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Desde 2015 no Mercado
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 leading-tight">
                  A Essência do Cacau, a Alma do Brasil
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Assista ao vídeo e descubra por que a Santé Cacau é a escolha certa para clientes que buscam sabor, saúde e qualidade.
                </p>
              </div>

              {/* Formulário de Captura */}
              <Card className="shadow-2xl border-2 border-amber-200 bg-white/95 backdrop-blur">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
                      Solicite Nosso Catálogo B2B
                    </h3>
                    <p className="text-gray-600">
                      Receba tabela de preços, condições especiais e material de apoio
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="empresa" className="text-gray-700 font-medium">Nome da Empresa *</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        placeholder="Sua Empresa Ltda"
                        value={formData.empresa}
                        onChange={handleChange}
                        required
                        className="mt-1 border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpj" className="text-gray-700 font-medium">CNPJ *</Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        placeholder="XX.XXX.XXX/XXXX-XX"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                        className="mt-1 border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsavel" className="text-gray-700 font-medium">Nome do Responsável *</Label>
                      <Input
                        id="responsavel"
                        name="responsavel"
                        placeholder="Seu Nome"
                        value={formData.responsavel}
                        onChange={handleChange}
                        required
                        className="mt-1 border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone" className="text-gray-700 font-medium">Telefone/WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(XX) XXXXX-XXXX"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="mt-1 border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">E-mail Corporativo *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contato@suaempresa.com.br"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Package className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Enviando...' : 'Quero Revender Santé Cacau'}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Ao enviar, você concorda em receber comunicações comerciais da Santé Cacau
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Visuais */}
      <section id="diferenciais" className="py-16 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Por Que Escolher Santé Cacau?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diferenciais que fazem a diferença nas vendas e na satisfação dos seus clientes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentials.map((diff, idx) => (
              <Card
                key={idx}
                className="border-2 border-transparent hover:border-amber-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${diff.color} rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {diff.icon}
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{diff.title}</h3>
                  <p className="text-gray-600">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section id="historia" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/sobreasante.webp"
              alt="Fundadora da Santé Cacau apresentando os chocolates artesanais"
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                Nossa História: Paixão e Propósito
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A Santé Cacau nasceu em 2015 do sonho de criar chocolates que fossem não apenas deliciosos, mas também genuinamente saudáveis. Somos uma empresa familiar que valoriza o processo artesanal, a seleção rigorosa de ingredientes e o respeito ao meio ambiente.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cada barra de chocolate carrega nossa dedicação em nutrir o corpo e a alma, oferecendo uma experiência única de sabor e bem-estar. Ao se tornar nosso parceiro, você leva essa história para seus clientes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 text-amber-700" />
                  <span className="font-medium text-amber-900">Certificação Kosher</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <Leaf className="w-5 h-5 text-green-700" />
                  <span className="font-medium text-green-900">100% Vegano</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <ChefHat className="w-5 h-5 text-orange-700" />
                  <span className="font-medium text-orange-900">Produção Artesanal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="produtos" className="py-16 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Catálogo de Produtos Gourmet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chocolates artesanais que combinam sabor excepcional com nutrição consciente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {product.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className={`${product.badgeColors[badge]} font-semibold shadow-md`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{product.category}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="border-amber-300 text-amber-700 font-bold">
                      {product.cacao} Cacau
                    </Badge>
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {product.weight}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <Star className="w-5 h-5 text-yellow-600 fill-current" />
              <span className="font-bold text-yellow-800">5.0 no Google (24 avaliações)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              O Que Nossos Parceiros Dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de quem já faz sucesso revendendo Santé Cacau
            </p>
          </div>
          <div className="max-w-6xl mx-auto px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="border-2 border-amber-100 hover:shadow-xl transition-shadow duration-300 h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex gap-1 text-yellow-500 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic flex-grow mb-4">"{testimonial.text}"</p>
                          <div className="border-t pt-4 flex items-center gap-4">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-200"
                            />
                            <div>
                              <p className="font-bold text-amber-900">{testimonial.name}</p>
                              <p className="text-sm text-gray-600">{testimonial.business}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-amber-100 hover:bg-amber-200 border-amber-300" />
              <CarouselNext className="bg-amber-100 hover:bg-amber-200 border-amber-300" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section with Icons */}
      <section id="faq" className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre nossa parceria B2B
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-2 border-amber-100 rounded-lg px-6 hover:border-amber-300 transition-colors"
                >
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full text-amber-700">
                        {item.icon}
                      </div>
                      <span className="text-left">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-700 pl-13 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10+</div>
              <p className="text-amber-100">Anos de Mercado</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">100%</div>
              <p className="text-amber-100">Artesanal</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">5.0⭐</div>
              <p className="text-amber-100">Avaliação Google</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">Nacional</div>
              <p className="text-amber-100">Entrega Todo Brasil</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final com Animação */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
              Pronto Para Transformar Seu Negócio?
            </h2>
            <p className="text-xl text-gray-700">
              Junte-se aos parceiros que já estão lucrando com chocolates de qualidade premium
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('hero')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-12 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Package className="w-5 h-5 mr-2" />
                Solicitar Catálogo Agora
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Resposta em até 24 horas úteis • Sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/Logo-Sante-Cacau.webp"
                  alt="Santé Cacau"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-amber-100 text-sm">
                Chocolates artesanais que nutrem o corpo e a alma. Tradição, qualidade e sabor em cada mordida.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <div className="space-y-3 text-amber-100 text-sm">
                <a href="mailto:contato@santecacau.com.br" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contato@santecacau.com.br</span>
                </a>
                <a href="https://wa.me/5517991982372" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>(17) 9 9198-2372</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>R. Sete de Setembro, 702 - Centro<br />Colina - SP, 14770-000</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
              <div className="space-y-2 text-amber-100 text-sm">
                <button onClick={() => scrollToSection('produtos')} className="block hover:text-white transition-colors">
                  Produtos
                </button>
                <button onClick={() => scrollToSection('diferenciais')} className="block hover:text-white transition-colors">
                  Diferenciais
                </button>
                <button onClick={() => scrollToSection('faq')} className="block hover:text-white transition-colors">
                  FAQ
                </button>
                <button onClick={() => scrollToSection('hero')} className="block hover:text-white transition-colors">
                  Seja Parceiro
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700 pt-8 text-center">
            <p className="text-amber-100 text-sm">
              © 2025 Santé Cacau - Todos os direitos reservados
            </p>
            <p className="text-xs text-amber-200 mt-2">
              CNPJ: 65.834.251/0001-17 | Rochas Comércio e Indústria de Alimentos de Colina Ltda
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
