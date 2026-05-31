export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/70 mt-2">Manage your site configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Site Name</label>
              <p className="text-white mt-1">Code & Convert</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Site URL</label>
              <p className="text-white mt-1">http://localhost:3000</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Admin Account</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Role</label>
              <p className="text-white mt-1">Administrator</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Status</label>
              <p className="text-white mt-1">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Database</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Provider</label>
              <p className="text-white mt-1">Supabase</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Status</label>
              <p className="text-green-400 mt-1">Connected</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Storage</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Provider</label>
              <p className="text-white mt-1">Supabase Storage</p>
            </div>
            <div>
              <label className="text-sm text-white/70">Status</label>
              <p className="text-green-400 mt-1">Connected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}