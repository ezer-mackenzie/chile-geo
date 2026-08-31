import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const RAW_DATA_DIR = join(import.meta.dir, '../raw-data');
const GEOJSON_OUT_DIR = join(import.meta.dir, '../packages/data-geojson/dist');
const TOPOJSON_OUT_DIR = join(import.meta.dir, '../packages/data-topojson/dist');
const TMP_DIR = join(import.meta.dir, '../.tmp_geojson_processing');

[GEOJSON_OUT_DIR, TOPOJSON_OUT_DIR].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});


interface LayerConfig {
  zipName: string;
  outputName: string;
  rawFields: string;
  renameTo: string; 
}

const layers: LayerConfig[] = [
  {
    zipName: 'Regions.zip',
    outputName: 'regions',
    rawFields: 'codregion,Region',
    renameTo: 'id=codregion,name=Region'
  },
  {
    zipName: 'Provinces.zip',
    outputName: 'provincias',
    rawFields: 'cod_prov,Provincia',
    renameTo: 'id=cod_prov,name=Provincia'
  },
  {
    zipName: 'Communes.zip',
    outputName: 'communes',
    rawFields: 'cod_comuna,Comuna',
    renameTo: 'id=cod_comuna,name=Comuna'
  },
  {
    zipName: 'Road-Network.zip',
    outputName: 'roads',
    rawFields: 'Tipo_Carpe,Nom_Ruta',
    renameTo: 'type=Tipo_Carpe,name=Nom_Ruta'
  }
];

async function processLayer(config: LayerConfig) {
  const zipPath = join(RAW_DATA_DIR, config.zipName);

  if (!existsSync(zipPath)) {
    console.warn(`⚠️ Warning: ${config.zipName} not found. Skipping...`);
    return;
  }

  console.log(`\n🚀 Extracting and optimizing ${config.zipName}...`);

  // 1. Descomprimir usando el comando de sistema nativo mediante Bun (evita fallos de adm-zip)
  const layerTmpDir = join(TMP_DIR, config.outputName);
  if (!existsSync(layerTmpDir)) mkdirSync(layerTmpDir, { recursive: true });
  
  await Bun.spawn(['unzip', '-o', zipPath, '-d', layerTmpDir]).exited;

  const geojsonPath = join(GEOJSON_OUT_DIR, `${config.outputName}.geojson`);
  const topojsonPath = join(TOPOJSON_OUT_DIR, `${config.outputName}.topojson`);

  const mapshaperArgs = [
    'bunx', 'mapshaper',
    join(layerTmpDir, '*.shp'),
    '-proj', 'wgs84', 
    '-simplify', '15%',
    '-filter-fields', config.rawFields,
    '-rename-fields', config.renameTo,
    '-o', geojsonPath, 'format=geojson', 'precision=0.0001', 'no-quantization',
    '-o', topojsonPath, 'format=topojson'
  ];

  const process = Bun.spawn(mapshaperArgs);
  await process.exited;

  console.log(`✅ Successfully generated files for ${config.outputName}`);
}

async function main() {
  console.log('--- Starting Geo-Chile Data Optimization Pipeline ---');
  
  for (const layer of layers) {
    await processLayer(layer);
  }

  // Limpiar la carpeta temporal al finalizar
  console.log('\n🧹 Cleaning up temporary extraction files...');
  rmSync(TMP_DIR, { recursive: true, force: true });

  console.log('\n🎉 Pipeline complete! All geographic datasets are perfectly optimized.');
}

main();