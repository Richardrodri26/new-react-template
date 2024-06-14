import { DataTable } from "@/components/TableElements/SimpleTable"
import { MetadataPagination, useParametersQuery } from "@/domain/graphql"
import { useState } from "react"
import { parametersColumns } from "./Columns"
import { PaginationTable } from "@/components/TableElements"

const take = 10


export const ParametersGrid = () => {
  const [skip, setSkip] = useState(0)
  const { data, loading } = useParametersQuery({
    variables: {
      pagination: {
        skip,
        take
      }
    }
  })

  return (
    <>
      <DataTable columns={parametersColumns} data={data?.parameters || []} isLoading={!data && loading} />

      <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.parametersCount as MetadataPagination} takeValue={take} />
    </>
  )
}