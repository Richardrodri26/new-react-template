
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AsideMenuMobile, BasicFormProviderZod, ButtonForm } from '@/components'
import { Link, useNavigate } from 'react-router-dom'
import useGeneral from '@/domain/store/general.store'
import { useEffect, useState } from 'react'
import { useDebounceCallback } from '@/hooks'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { z } from 'zod'

export const ClientsHeader = ({ callback }: { callback: (searchValue: string) => Promise<void> }) => {
  const navigate = useNavigate();
  const logout = useGeneral(state => state.logout)

  const [value, setValue] = useState<string>('')
  const debounced = useDebounceCallback(setValue, 500)

  const onLogout = () => {
    logout()
    navigate("/")
  }


  useEffect(() => {
    callback(value)
  }, [value])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <AsideMenuMobile />

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              {/* <Link to={"/dashboard"}>Dashboard</Link> */}
              <p>Dashboard</p>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/dashboard"}>Clientes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">

      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre o nit..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          onChange={event => debounced(event.target.value)}
          defaultValue={value}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src="/sell-icon.jpeg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Cerrar sesion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}