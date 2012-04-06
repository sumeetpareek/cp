#!/usr/bin/perl

use YAML;

use warnings;
use YAML::Dumper;
    my $dumper = YAML::Dumper->new;
    $dumper->indent_width(2);

    
$hash = {};
$first = 1;
$count = 1;
while ( <> ) {
    if ($first) {
      $first = 0;
      next;
    }
    chomp;
    last unless /\S/;
    $count_str = sprintf("%.3d", $count);
    my ($a, $b, $c, $d) = split /,/;
    $a =~ s/\r\n//g; $a =~ s/\r//g; $a =~ s/\n//g;
    $b =~ s/\r\n//g; $b =~ s/\r//g; $b =~ s/\n//g;
    $c =~ s/\r\n//g; $c =~ s/\r//g; $c =~ s/\n//g;
    $d =~ s/\r\n//g; $d =~ s/\r//g; $d =~ s/\n//g;

    $hash->{'player_'.$count_str} = {'role'=>$a, 'name'=>$b, 'key'=>$c, 'team'=>$d};
    $count++;
}
# $hash = {'match_01'=>{'start_time'=>'asdf','team_one'=>'asdf_team','team_two'=>'team_adf'}};
    print $dumper->dump($hash);
