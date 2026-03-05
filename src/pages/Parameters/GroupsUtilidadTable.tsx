import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PriceGroup {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  groupCode: string;
  groupName: string;
  utilidad: number;
  active: boolean;
}

type ActiveFilter = "all" | "active" | "inactive";

const API_BASE_URL = "http://localhost:3002";

export const GroupsUtilidadTable = () => {
  const [groups, setGroups] = useState<PriceGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({
    groupCode: "",
    groupName: "",
    utilidad: "",
  });
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PriceGroup | null>(null);
  const [editUtilidad, setEditUtilidad] = useState("");
  const [editActive, setEditActive] = useState(true);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/lista-precio/admin/groups`);
      if (!response.ok) throw new Error("No fue posible cargar los grupos.");

      const data = await response.json();
      const rows = Array.isArray(data) ? data : [data];
      setGroups(rows);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error cargando grupos.";
      toast.error(message);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const filteredGroups = useMemo(() => {
    return groups
      .filter((group) =>
        String(group.groupCode).toLowerCase().includes(filters.groupCode.toLowerCase())
      )
      .filter((group) =>
        String(group.groupName).toLowerCase().includes(filters.groupName.toLowerCase())
      )
      .filter((group) =>
        filters.utilidad
          ? group.utilidad.toString().includes(filters.utilidad.trim())
          : true
      )
      .filter((group) => {
        if (activeFilter === "active") return group.active;
        if (activeFilter === "inactive") return !group.active;
        return true;
      })
      .sort((a, b) => a.groupCode.localeCompare(b.groupCode));
  }, [groups, filters, activeFilter]);

  const openEditModal = (group: PriceGroup) => {
    setSelectedGroup(group);
    setEditUtilidad(group.utilidad.toString());
    setEditActive(group.active);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
    setEditUtilidad("");
    setEditActive(true);
  };

  const onUpdateGroup = async () => {
    if (!selectedGroup) return;

    const utilidadValue = Number(editUtilidad);
    if (Number.isNaN(utilidadValue)) {
      toast.error("La utilidad debe ser numérica.");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/lista-precio/admin/groups/${selectedGroup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          utilidad: utilidadValue,
          active: editActive,
        }),
      });

      if (!response.ok) {
        throw new Error("No fue posible actualizar el grupo.");
      }

      setGroups((prev) =>
        prev.map((group) =>
          group.id === selectedGroup.id
            ? { ...group, utilidad: utilidadValue, active: editActive, updatedAt: new Date().toISOString() }
            : group
        )
      );

      toast.success("Grupo actualizado correctamente.");
      closeEditModal();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error actualizando el grupo.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grupos Lista Precio</CardTitle>
        <CardDescription>Actualiza utilidad y estado activo desde un modal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <Input
            placeholder="Buscar código"
            value={filters.groupCode}
            onChange={(e) => setFilters((prev) => ({ ...prev, groupCode: e.target.value }))}
          />
          <Input
            placeholder="Buscar nombre"
            value={filters.groupName}
            onChange={(e) => setFilters((prev) => ({ ...prev, groupName: e.target.value }))}
          />
          <Input
            placeholder="Buscar utilidad"
            value={filters.utilidad}
            onChange={(e) => setFilters((prev) => ({ ...prev, utilidad: e.target.value }))}
          />
          <select
            className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as ActiveFilter)}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="w-full min-w-[900px]">
            <thead className="bg-muted/60 border-b">
              <tr>
                <th className="text-left text-xs uppercase px-3 py-2">Código</th>
                <th className="text-left text-xs uppercase px-3 py-2">Grupo</th>
                <th className="text-left text-xs uppercase px-3 py-2">Utilidad</th>
                <th className="text-left text-xs uppercase px-3 py-2">Activo</th>
                <th className="text-left text-xs uppercase px-3 py-2">Actualizado</th>
                <th className="text-left text-xs uppercase px-3 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center text-sm py-8">
                    Cargando grupos...
                  </td>
                </tr>
              ) : filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-sm py-8">
                    No hay grupos para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <tr key={group.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2 text-sm">{group.groupCode}</td>
                    <td className="px-3 py-2 text-sm">{group.groupName}</td>
                    <td className="px-3 py-2 text-sm">{group.utilidad}%</td>
                    <td className="px-3 py-2 text-sm">{group.active ? "Sí" : "No"}</td>
                    <td className="px-3 py-2 text-sm">
                      {new Date(group.updatedAt).toLocaleString("es-CO")}
                    </td>
                    <td className="px-3 py-2 text-sm">
                      <Button size="sm" variant="outline" onClick={() => openEditModal(group)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeEditModal();
            return;
          }
          setIsModalOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar utilidad</DialogTitle>
            <DialogDescription>
              {selectedGroup
                ? `${selectedGroup.groupCode} - ${selectedGroup.groupName}`
                : "Edita la utilidad y estado del grupo."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Utilidad (%)</label>
              <Input
                type="number"
                value={editUtilidad}
                onChange={(e) => setEditUtilidad(e.target.value)}
                min={0}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="group-active"
                type="checkbox"
                checked={editActive}
                onChange={(e) => setEditActive(e.target.checked)}
              />
              <label htmlFor="group-active" className="text-sm font-medium">
                Activo
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeEditModal}>
              Cancelar
            </Button>
            <Button type="button" onClick={onUpdateGroup} disabled={saving}>
              {saving ? "Guardando..." : "Actualizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
