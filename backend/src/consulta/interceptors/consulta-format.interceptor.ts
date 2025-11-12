import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConsultaFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((consulta) => this.formatConsulta(consulta));
        }
        return this.formatConsulta(data);
      }),
    );
  }

  private formatConsulta(consulta: any) {
    if (!consulta) return consulta;

    const formatted = { ...consulta };

    if (consulta.dia) {
      const date = new Date(consulta.dia);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      formatted.dia = `${day}/${month}/${year}`;
    }

    if (consulta.medico) {
      formatted.medico = {
        id: consulta.medico.id,
        crm: consulta.medico.crm,
        nome: consulta.medico.nome,
        email: consulta.medico.email,
        especialidade: consulta.medico.especialidade
          ? {
              id: consulta.medico.especialidade.id,
              nome: consulta.medico.especialidade.nome,
            }
          : null,
      };
    }

    return formatted;
  }
}

