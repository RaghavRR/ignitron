import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAdminKits,
  deleteKit,
  updateKit,
} from '../../api/kits';

const AdminKits = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchKits = async () => {
    try {
      setLoading(true);

      const result = await getAdminKits();

      if (result.success) {
        setKits(result.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load kits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKits();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this kit?'
    );

    if (!confirmed) return;

    try {
      await deleteKit(id);
      await fetchKits();
    } catch (err) {
      alert(err.message || 'Failed to delete kit');
    }
  };

  const toggleStatus = async (kit) => {
    try {
      await updateKit(kit._id, {
        isActive: !kit.isActive,
      });

      await fetchKits();
    } catch (err) {
      alert(err.message || 'Failed to update kit');
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-gray-500">
          Loading kits...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Kits
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all DIY STEM kits.
          </p>
        </div>

        <Link
          to="/admin/kits/new"
          className="btn-primary inline-flex justify-center"
        >
          + Add New Kit
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Empty */}
      {kits.length === 0 && !error && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            No kits yet
          </h3>

          <p className="text-gray-500 mb-6">
            Add your first STEM kit.
          </p>

          <Link
            to="/admin/kits/new"
            className="btn-primary inline-flex"
          >
            Add Kit
          </Link>
        </div>
      )}

      {/* Desktop Table */}
      {kits.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4">
                    Kit
                  </th>

                  <th className="text-left p-4">
                    Price
                  </th>

                  <th className="text-left p-4">
                    Stock
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {kits.map((kit) => (
                  <tr
                    key={kit._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={kit.image}
                          alt={kit.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />

                        <div>
                          <p className="font-semibold">
                            {kit.name}
                          </p>

                          <p className="text-sm text-gray-500 max-w-[300px] truncate">
                            {kit.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-medium">
                      ₹
                      {Number(kit.price).toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    <td className="p-4">
                      {kit.stock}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          toggleStatus(kit)
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          kit.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {kit.isActive
                          ? 'Active'
                          : 'Inactive'}
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/kits/${kit._id}/edit`}
                          className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(kit._id)
                          }
                          className="px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKits;