import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  // inyectamos la dependencia de PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // console.log({ createProductDto });

    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      orderBy: {
        price: 'desc',
      },
    });
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    void id;
    void updateProductDto;
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // Inserta los productos de seed desde el archivo SQL
  async seedProducts() {
    const products = [
      { name: 'Teclado', price: 75.25 },
      { name: 'Mouse', price: 150.0 },
      { name: 'Monitor', price: 150.0 },
      { name: 'Audífonos', price: 50.0 },
      { name: 'Laptop', price: 1000.0 },
      { name: 'Smartphone', price: 800.0 },
      { name: 'Tablet', price: 300.0 },
      { name: 'Impresora', price: 200.0 },
      { name: 'Altavoces', price: 150.0 },
      { name: 'Cámara', price: 400.0 },
      { name: 'Televisor', price: 700.0 },
      { name: 'Router', price: 80.0 },
      { name: 'Reproductor Blu-ray', price: 180.0 },
      { name: 'Teclado inalámbrico', price: 60.0 },
      { name: 'Mouse inalámbrico', price: 80.0 },
      { name: 'Webcam', price: 70.0 },
      { name: 'Tarjeta de video', price: 250.0 },
      { name: 'Memoria RAM', price: 120.0 },
      { name: 'Disco duro externo', price: 150.0 },
      { name: 'Tarjeta madre', price: 350.0 },
      { name: 'Procesador', price: 300.0 },
      { name: 'Gabinete para PC', price: 80.0 },
      { name: 'Fuente de poder', price: 100.0 },
      { name: 'Router inalámbrico', price: 50.0 },
      { name: 'Adaptador Wi-Fi USB', price: 30.0 },
      { name: 'Cargador portátil', price: 40.0 },
      { name: 'Batería de repuesto', price: 50.0 },
      { name: 'Mochila para laptop', price: 40.0 },
      { name: 'Estuche para tablet', price: 20.0 },
      { name: 'Cable HDMI', price: 10.0 },
      { name: 'Adaptador de corriente', price: 20.0 },
      { name: 'Soporte para monitor', price: 30.0 },
      { name: 'Base para laptop', price: 25.0 },
      { name: 'Teclado numérico', price: 15.0 },
      { name: 'Mouse ergonómico', price: 35.0 },
      { name: 'Auriculares con micrófono', price: 50.0 },
      { name: 'Control remoto universal', price: 20.0 },
      { name: 'Base para smartphone', price: 15.0 },
      { name: 'Adaptador de audio Bluetooth', price: 25.0 },
      { name: 'Lector de tarjetas de memoria', price: 15.0 },
      { name: 'Cable USB-C', price: 10.0 },
      { name: 'Cable Lightning', price: 10.0 },
      { name: 'Cable VGA', price: 10.0 },
      { name: 'Cable DisplayPort', price: 10.0 },
      { name: 'Cable de red Ethernet', price: 10.0 },
      { name: 'Bolsa para laptop', price: 25.0 },
      { name: 'Almohadilla para mouse', price: 15.0 },
    ];

    let inserted = 0;
    let skipped = 0;

    for (const product of products) {
      try {
        await this.prisma.product.create({
          data: product,
        });
        inserted++;
      } catch {
        // Si el producto ya existe (name es único), lo saltamos
        skipped++;
      }
    }

    return {
      message: `Se insertaron ${inserted} productos`,
      inserted,
      skipped,
      total: products.length,
    };
  }
}
