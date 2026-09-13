import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = join(root, "dir", "links.schema.json");
const dataPath = join(root, "dir", "links.json");

const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const data = JSON.parse(readFileSync(dataPath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const validate = ajv.compile(schema);
const ok = validate(data);

const errors = [];

if (!ok) {
  for (const err of validate.errors ?? []) {
    errors.push(`schema: ${err.instancePath || "/"} ${err.message}`);
  }
}

const seen = new Map();
for (const [topicIndex, topic] of data.entries()) {
  for (const [itemIndex, item] of (topic.items ?? []).entries()) {
    const path = `/[${topicIndex}].items[${itemIndex}]`;
    if (!item?.id) continue;
    if (seen.has(item.id)) {
      errors.push(`unique id: duplicate "${item.id}" at ${path} (also ${seen.get(item.id)})`);
    } else {
      seen.set(item.id, path);
    }
  }
}

if (errors.length) {
  console.error(`dir/links.json validation failed (${errors.length}):\n`);
  for (const line of errors) console.error(`- ${line}`);
  process.exit(1);
}

console.log(`dir/links.json OK (${seen.size} items, schema + unique ids)`);
