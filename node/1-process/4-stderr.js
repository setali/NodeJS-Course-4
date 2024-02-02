// node 4-stderr.js 2> error.txt 1> output.txt

process.stderr.write('Error!!!\n')

process.stdout.write('Output\n')
