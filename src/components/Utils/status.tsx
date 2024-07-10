import { StatusVisitEnum } from "@/domain/graphql";

export const STATUSVISITCHANGSPANISH = (status: StatusVisitEnum) =>{
    switch(status){
        case StatusVisitEnum.Canceled: 
          return 'CANCELADA'
        case StatusVisitEnum.Confirmed: 
          return 'CONFIRMADA'
        case StatusVisitEnum.Programmed: 
          return 'PROGRAMADA'
        case StatusVisitEnum.Realized: 
          return 'REALIZADA'
        case StatusVisitEnum.Reprogrammed: 
          return 'REPROGRAMADA'
        default: 
          return 'NINGUNO'
      }
}