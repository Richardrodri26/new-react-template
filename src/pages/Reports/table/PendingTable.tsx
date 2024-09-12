import { OrderTypes, StatusVisitEnum, useVisitsQuery, Visit } from "@/domain/graphql";
import { DataTableVisits } from "@/pages/Visits/Grids";
import { useState } from "react";
import { visitsPendingColumns } from "./columns";

export const GridPendingVisit  = () => {
    const [skip, setSkip] = useState(0)
    const takeValue = 10
    const { data, loading } = useVisitsQuery({
      variables: {
        pagination: {
          skip,
          take: takeValue
        },
        where: {
            status: {
                _eq: StatusVisitEnum.Programmed
            }
        },
        orderBy: {
          createdAt: OrderTypes.Desc
        }
      }
    })
  
    const visits = (data?.visits || []) as Visit[];
    return (
        <>
            <DataTableVisits isLoading={!data && loading} columns={visitsPendingColumns as any} data={visits} />
        </>
    )
}