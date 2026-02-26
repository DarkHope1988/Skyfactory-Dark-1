// Ore unlock chain profile
// Defines custom meteor-derived resources that bridge into vanilla metals later.

(function () {
  if (global.SFDOreChainProfile) return;

  global.SFDOreChainProfile = Object.freeze({
    materials: Object.freeze({
      ferrous: Object.freeze({
        shard: 'sfd_comets:proto_iron_cluster',
        nugget: 'minecraft:iron_nugget'
      }),
      cupric: Object.freeze({
        shard: 'sfd_comets:proto_copper_cluster',
        nugget: 'minecraft:copper_ingot'
      })
    }),

    catalysts: Object.freeze({
      meteoricSlag: 'sfd_comets:meteoric_slag',
      mineralCatalyst: 'sfd_comets:mineral_catalyst',
      rawMetalLattice: 'sfd_comets:raw_metal_lattice'
    })
  });
})();

