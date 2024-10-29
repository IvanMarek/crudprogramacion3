import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PerfilService } from "./perfil.service";
import { CreatePerfilDto } from "./dto/create-perfil.dto";
import { UpdatePerfilDto } from "./dto/update-perfil.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("perfil")
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("foto", {
      storage: diskStorage({
        destination: "./public/uploads", // Carpeta donde se guardarán las imágenes
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async create(
    @Body() createPerfilDto: CreatePerfilDto,
    @UploadedFile() foto: Express.Multer.File
  ) {
    const imagenUrl = `/uploads/${foto.filename}`; // Generar la URL de la imagen guardada
    console.log(imagenUrl);

    // Añadir la URL de la imagen al DTO antes de enviarlo al servicio
    const perfilConImagen = { ...createPerfilDto, foto: imagenUrl };

    return this.perfilService.create(perfilConImagen);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.perfilService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilService.update(+id, updatePerfilDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.perfilService.remove(+id);
  }
}
