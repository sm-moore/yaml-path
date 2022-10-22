import * as assert from 'assert';
// import * as path from 'path';
import { join } from 'path';
import * as vscode from 'vscode';
import { readFileSync } from 'fs';

import { parseYaml } from '../util';

describe('parseYaml', function () {
  it('should parse the service account create key', function () {
    const lines: string[] = readFileSync(join(__dirname, 'test.yaml'), 'utf-8').split('\n');
    const scopedLines = lines.slice(0, 3);
    const parse = parseYaml('  create: false', scopedLines);
    assert.equal('serviceAccount.create', parse);
  });
  it('should parse the secretRef name key', function () {
    const lines: string[] = readFileSync(join(__dirname, 'test.yaml'), 'utf-8').split('\n');
    const parse = parseYaml('      name: phenomap', lines);
    assert.equal('envFrom.secretRef.name', parse);
  });
  it('should parse first object', function () {
    const lines: string[] = readFileSync(join(__dirname, 'test2.yaml'), 'utf-8').split('\n');
    const scopedLines = lines.slice(0, 13);
    const parse = parseYaml('    kind: ClusterSecretStore', scopedLines);
    assert.equal('spec.secretStoreRef.kind', parse);
  });
  it('should parse second object', function () {
    const lines: string[] = readFileSync(join(__dirname, 'test2.yaml'), 'utf-8').split('\n');
    const scopedLines = lines.slice(0, 29);
    const parse = parseYaml('    name: target-name2', scopedLines);
    assert.equal('spec.target.name', parse);
  });
});