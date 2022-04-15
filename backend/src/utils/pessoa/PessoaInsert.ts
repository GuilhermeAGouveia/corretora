import { PrismaClient } from "@prisma/client";
import { Corretor, Locador, PessoaWithTelefone } from "./interfaces";

//Essa classe existe para tratar a herança na inserção, coisa que o prisma infelizmente não suporta ainda

class PessoaInheritanceInsert {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async insertPessoa({ telefones, ...pessoa }: PessoaWithTelefone) {

        const phones = telefones
          ? {
              createMany: {
                data: telefones.map((telefone) => ({
                  numero: telefone,
                })),
                skipDuplicates: true
              },
              
            }
          : undefined;
    
        const pessoaInsert = await this.prisma.pessoa.create({
          data: {
            ...pessoa,
            phones,
          },
        });

        return pessoaInsert
    }
    async insertLocador({ is_partner, ...pessoaWithTelefone } : Locador){

       const pessoa = await this.insertPessoa(pessoaWithTelefone)

       const locador = await this.prisma.locador.create({
           data:{
               is_partner,
               cod_lcd: pessoa.id,
           },
           
       })

       return {...locador, ...pessoa}
    }

    async insertCorretor({ score, ...pessoaWithTelefone } : Corretor) {

      const pessoa = await this.insertPessoa(pessoaWithTelefone)

      const corretor = await this.prisma.corretor.create({
          data:{
              score,
              cod_cor: pessoa.id,
          },
          
      })

      return {...corretor, ...pessoa}
      
    }
}

export default PessoaInheritanceInsert