#!/usr/bin/env node
import { program } from 'commander'
import init from './init'

void (async function () {
  program.version('0.0.1')

  program.command('init [name]').description('init project').action(init)

  await program.parseAsync(process.argv)
})()
