import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const API_BASE_URL = (import.meta.env.VITE_APP_GRAPH || "http://localhost:3002").replace(/\/$/, "");

export const GroupsUtilidadTable = () => {
  const [groups, setGroups] = useState<PriceGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    groupCode: "",
    groupName: "",
    utilidad: "",
  });
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUtilidad, setEditUtilidad] = useState("");

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
        filters.utilidad ? group.utilidad.toString().includes(filters.utilidad.trim()) : true
      )
      .filter((group) => {
        if (activeFilter === "active") return group.active;
        if (activeFilter === "inactive") return !group.active;
        return true;
      })
      .sort((a, b) => a.groupCode.localeCompare(b.groupCode));
  }, [groups, filters, activeFilter]);

  const startInlineEdit = (group: PriceGroup) => {
    setEditingId(group.id);
    setEditUtilidad(group.utilidad.toString());
  };

  const cancelInlineEdit = () => {
    setEditingId(null);
    setEditUtilidad("");
  };

  const saveInlineEdit = async (groupId: string) => {
    const utilidadValue = Number(editUtilidad);
    if (Number.isNaN(utilidadValue)) {
      toast.error("La utilidad debe ser numerica.");
      return;
    }

    try {
      setSavingId(groupId);
      const response = await fetch(`${API_BASE_URL}/lista-precio/admin/groups/${groupId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          utilidad: utilidadValue,
        }),
      });

      if (!response.ok) {
        throw new Error("No fue posible actualizar la utilidad.");
      }

      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? { ...group, utilidad: utilidadValue, updatedAt: new Date().toISOString() }
            : group
        )
      );

      toast.success("Utilidad actualizada.");
      cancelInlineEdit();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error actualizando la utilidad.";
      toast.error(message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grupos lista precio</CardTitle>
        <CardDescription>Edita utilidad directamente en la tabla.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <Input
            placeholder="Buscar codigo"
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
                <th className="text-left text-xs uppercase px-3 py-2">Codigo</th>
                <th className="text-left text-xs uppercase px-3 py-2">Grupo</th>
                <th className="text-left text-xs uppercase px-3 py-2">Utilidad</th>
                <th className="text-left text-xs uppercase px-3 py-2">Activo</th>
                <th className="text-left text-xs uppercase px-3 py-2">Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center text-sm py-8">
                    Cargando grupos...
                  </td>
                </tr>
              ) : filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-sm py-8">
                    No hay grupos para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => {
                  const isEditing = editingId === group.id;
                  const isSaving = savingId === group.id;

                  return (
                    <tr key={group.id} className="border-b last:border-b-0">
                      <td className="px-3 py-2 text-sm">{group.groupCode}</td>
                      <td className="px-3 py-2 text-sm">{group.groupName}</td>
                      <td className="px-3 py-2 text-sm">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <Input
                              autoFocus
                              className="h-8 max-w-[120px]"
                              type="number"
                              value={editUtilidad}
                              min={0}
                              onChange={(e) => setEditUtilidad(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveInlineEdit(group.id);
                                }
                                if (e.key === "Escape") {
                                  cancelInlineEdit();
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              disabled={isSaving}
                              onClick={() => saveInlineEdit(group.id)}
                            >
                              {isSaving ? "Guardando..." : "Guardar"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isSaving}
                              onClick={cancelInlineEdit}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="underline underline-offset-2 hover:text-primary"
                            onClick={() => startInlineEdit(group)}
                          >
                            {group.utilidad}%
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-2 text-sm">{group.active ? "Si" : "No"}</td>
                      <td className="px-3 py-2 text-sm">
                        {new Date(group.updatedAt).toLocaleString("es-CO")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
