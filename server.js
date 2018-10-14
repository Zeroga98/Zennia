const exec = require('child_process').exec;
exec('javac ./practice/HelloWorld.java', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    exec('java -cp "./practice" HelloWorld', (e2, stdout2, stderr2)=> {
	    if (e2 instanceof Error) {
	        console.error(e2);
	        throw e2;
	    }
	    console.log('stdout ', stdout2);
	    console.log('stderr ', stderr2);
	});
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
});