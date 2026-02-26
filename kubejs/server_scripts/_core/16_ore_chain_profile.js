// Ore unlock chain profile
// Defines custom meteor-derived resources that bridge into vanilla metals later.

(function () {
  if (global.SFDOreChainProfile) return;

  global.SFDOreChainProfile = Object.freeze({
    materials: Object.freeze({
      ferrous: Object.freeze({
        shard: 'sfd_comets:comet_proto_iron_cluster',
        nugget: 'minecraft:iron_nugget'
      }),
      cupric: Object.freeze({
        shard: 'sfd_comets:comet_proto_copper_cluster',
        nugget: 'minecraft:copper_ingot'
      })
    }),

    catalysts: Object.freeze({
      meteoricSlag: 'sfd_comets:comet_meteoric_slag',
      mineralCatalyst: 'sfd_comets:comet_mineral_catalyst',
      rawMetalLattice: 'sfd_comets:comet_raw_metal_lattice'
    })
  });
})();

